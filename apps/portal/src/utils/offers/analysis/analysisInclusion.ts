export const analysisInclusion = {
  companyAnalysis: {
    include: {
      analysedOffer: {
        include: {
          company: true,
          offersFullTime: {
            include: {
              totalCompensation: true,
            },
          },
          offersIntern: {
            include: {
              monthlySalary: true,
            },
          },
          profile: {
            include: {
              background: true,
            },
          },
        },
      },
      topSimilarOffers: {
        include: {
          company: true,
          location: {
            include: {
              state: {
                include: {
                  country: true,
                },
              },
            },
          },
          offersFullTime: {
            include: {
              totalCompensation: true,
            },
          },
          offersIntern: {
            include: {
              monthlySalary: true,
            },
          },
          profile: {
            include: {
              background: {
                include: {
                  experiences: {
                    include: {
                      company: true,
                      location: {
                        include: {
                          state: {
                            include: {
                              country: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  overallAnalysis: {
    include: {
      analysedOffer: {
        include: {
          company: true,
          offersFullTime: {
            include: {
              totalCompensation: true,
            },
          },
          offersIntern: {
            include: {
              monthlySalary: true,
            },
          },
          profile: {
            include: {
              background: true,
            },
          },
        },
      },
      topSimilarOffers: {
        include: {
          company: true,
          location: {
            include: {
              state: {
                include: {
                  country: true,
                },
              },
            },
          },
          offersFullTime: {
            include: {
              totalCompensation: true,
            },
          },
          offersIntern: {
            include: {
              monthlySalary: true,
            },
          },
          profile: {
            include: {
              background: {
                include: {
                  experiences: {
                    include: {
                      company: true,
                      location: {
                        include: {
                          state: {
                            include: {
                              country: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  overallHighestOffer: {
    include: {
      company: true,
      location: {
        include: {
          state: {
            include: {
              country: true,
            },
          },
        },
      },
      offersFullTime: {
        include: {
          totalCompensation: true,
        },
      },
      offersIntern: {
        include: {
          monthlySalary: true,
        },
      },
      profile: {
        include: {
          background: true,
        },
      },
    },
  },
};
