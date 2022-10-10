import crypto from "crypto";
import { z } from "zod";
import { Prisma } from "@prisma/client";

import { createProtectedRouter } from "./context";

const valuation = z.object({
    currency: z.string(),
    value: z.number(),
})

// TODO: handle both full time and intern
const offer = z.object({
    comments: z.string(),
    companyId: z.string(),
    job: z.object({
        base: valuation.optional(), // Full time
        bonus: valuation.optional(), // Full time
        internshipCycle: z.string().optional(), // Intern
        level: z.string().optional(), // Full time
        monthlySalary: valuation.optional(), // Intern
        specialization: z.string(),
        startYear: z.number().optional(), // Intern
        stocks: valuation.optional(), // Full time
        title: z.string(),
        totalCompensation: valuation.optional(), // Full time
    }),
    jobType: z.string(),
    location: z.string(),
    monthYearReceived: z.date(),
    negotiationStrategy: z.string(),
})

const experience = z.object({
    companyId: z.string().optional(),
    durationInMonths: z.number().optional(),
    jobType: z.string().optional(),
    level: z.string().optional(),
    monthlySalary: valuation.optional(),
    specialization: z.string().optional(),
    title: z.string().optional(),
    totalCompensation: valuation.optional(),
})

const education = z.object({
    endDate: z.date().optional(),
    field: z.string().optional(),
    school: z.string().optional(),
    startDate: z.date().optional(),
    type: z.string().optional(),
})

export const offersProfileRouter = createProtectedRouter().mutation(
    'create',
    {
        input: z.object({
            background: z.object({
                educations: z.array(education),
                experiences: z.array(experience),
                specificYoes: z.array(z.object({
                    domain: z.string(),
                    yoe: z.number()
                })),
                totalYoe: z.number(),
            }),
            offers: z.array(offer)
        }),
        async resolve({ ctx, input }) {

            // TODO: add more
            const token = crypto
            .createHash("sha256")
            .update(Date.now().toString())
            .digest("hex");

            const profile = await ctx.prisma.offersProfile.create({
                data: {
                    background: {
                        create: {
                            educations: {
                                create:
                                    input.background.educations.map((x) => ({
                                        endDate: x.endDate,
                                        field: x.field,
                                        school: x.school,
                                        startDate: x.startDate,
                                        type: x.type
                                    }))
                            },
                            experiences: {
                                create:
                                    input.background.experiences.map((x) => {
                                        if (x.jobType === "INTERN" && x.totalCompensation?.currency !== undefined && x.totalCompensation.value !== undefined) {
                                            return {
                                                companyId: {
                                                    connect: {
                                                        id: x.companyId
                                                    }
                                                },
                                                durationInMonths: x.durationInMonths,
                                                jobType: x.jobType,
                                                level: x.level,
                                                specialization: x.specialization,
                                                title: x.title,
                                                totalCompensation: {
                                                    create: {
                                                        currency: x.totalCompensation?.currency,
                                                        value: x.totalCompensation?.value,
                                                    }
                                                },
                                            }
                                        }
                                        if (x.jobType === "FULLTIME" && x.monthlySalary?.currency !== undefined && x.monthlySalary.value !== undefined) {
                                            return {
                                                companyId: {
                                                    connect: {
                                                        id: x.companyId
                                                    }
                                                },
                                                durationInMonths: x.durationInMonths,
                                                jobType: x.jobType,
                                                monthlySalary: {
                                                    create: {
                                                        currency: x.monthlySalary?.currency,
                                                        value: x.monthlySalary?.value
                                                    }
                                                },
                                                specialization: x.specialization,
                                                title: x.title,
                                            }
                                        }

                                        throw Prisma.PrismaClientKnownRequestError

                                    })
                            },
                            specificYoes: {
                                create:
                                    input.background.specificYoes.map((x) => ({
                                        domain: x.domain,
                                        yoe: x.yoe
                                    }))
                            },
                            totalYoe: input.background.totalYoe,
                        }
                    },
                    editToken: token,
                    offers: {
                        create:
                            input.offers.map((x) => {
                                if (x.jobType === "INTERN" || x.jobType === "FULLTIME") {
                                    return {
                                        // OffersIntern: {
                                        //     create: {
                                        //         internshipCycle: x.job.internshipCycle,
                                        //         monthlySalary: {
                                        //             create: {
                                        //                 currency: x.job.monthlySalary?.currency,
                                        //                 value: x.job.monthlySalary?.value
                                        //             }
                                        //         },
                                        //         specialization: x.job.specialization,
                                        //         startYear: x.job.startYear,
                                        //         title: x.job.title,
                                        //     }
                                        // },
                                        comments: x.comments,
                                        company: {
                                            connect: {
                                                id: x.companyId
                                            }
                                        },
                                        jobType: x.jobType,
                                        location: x.location,
                                        monthYearReceived: x.monthYearReceived,
                                        negotiationStrategy: x.negotiationStrategy
                                    }
                                }
                                // If (x.jobType === "FULLTIME") {
                                //     return {
                                //         // OffersFullTime: {
                                //         //         create: {
                                //         //             baseSalaryId: {
                                //         //                 create: {
                                //         //                     currency: x.job.base?.currency,
                                //         //                     value: x.job.base?.value
                                //         //                 }
                                //         //             },
                                //         //             bonusId: {
                                //         //                 create: {
                                //         //                     currency: x.job.bonus?.currency,
                                //         //                     value: x.job.bonus?.value
                                //         //                 }
                                //         //             },
                                //         //             level: x.job.level,
                                //         //             specialization: x.job.specialization,
                                //         //             startYear: x.job.startYear,
                                //         //             stocks: {
                                //         //                 create: {
                                //         //                     currency: x.job.stocks?.currency,
                                //         //                     value: x.job.stocks?.value,
                                //         //                 }
                                //         //             },
                                //         //             title: x.job.title,
                                //         //         }
                                //         //     },
                                //         comments: x.comments,
                                //         company: {
                                //             connect: {
                                //                 id: x.companyId
                                //             }
                                //         },
                                //         jobType: x.jobType,
                                //         location: x.location,
                                //         monthYearReceived: x.monthYearReceived,
                                //         negotiationStrategy: x.negotiationStrategy
                                //     }
                                // }

                                // Throw error
                                throw Prisma.PrismaClientKnownRequestError
                            })
                    },
                    profileName: "anonymous account",
                },
                // Include: {
                //     select: {
                //         id: true
                //     }
                // }
            });

            // Create specific jobs
            input.offers.map((x) => {
                if (x.jobType === "INTERN" && x.job.internshipCycle !== undefined && x.job.monthlySalary?.currency !== undefined && x.job.monthlySalary.value !== undefined && x.job.startYear !== undefined) {
                    ctx.prisma.offersIntern.create({
                        data: {
                            internshipCycle: x.job.internshipCycle,
                            monthlySalary: {
                                create: {
                                    currency: x.job.monthlySalary?.currency,
                                    value: x.job.monthlySalary?.value
                                }
                            },
                            offer: {
                                connect: {
                                    id: profile.id
                                }
                            },
                            specialization: x.job.specialization,
                            startYear: x.job.startYear,
                            title: x.job.title,
                        }
                    })
                } else if (x.jobType === "FULLTIME" && x.job.startYear !== undefined && x.job.base?.currency !== undefined && x.job.base?.value !== undefined && x.job.bonus?.currency !== undefined && x.job.bonus?.value !== undefined && x.job.stocks?.currency !== undefined && x.job.stocks?.value !== undefined && x.job.totalCompensation?.currency !== undefined && x.job.totalCompensation?.value !== undefined && x.job.level !== undefined) {
                    ctx.prisma.offersFullTime.create({
                        data: {
                            baseSalary: {
                                create: {
                                    currency: x.job.base?.currency,
                                    value: x.job.base?.value
                                }
                            },
                            bonus: {
                                create: {
                                    currency: x.job.bonus?.currency,
                                    value: x.job.bonus?.value
                                }
                            },
                            level: x.job.level,
                            offer: {
                                connect: {
                                    id: profile.id
                                }
                            },
                            specialization: x.job.specialization,
                            stocks: {
                                create: {
                                    currency: x.job.stocks?.currency,
                                    value: x.job.stocks?.value,
                                }
                            },
                            title: x.job.title,
                            totalCompensation: {
                                create: {
                                    currency: x.job.totalCompensation?.currency,
                                    value: x.job.totalCompensation?.value,
                                }
                            },
                        }
                    })
                }

                throw Prisma.PrismaClientKnownRequestError
            })

            // TODO: add analysis to profile object then return
            return profile
        }
    },
);
