module.exports = {
  docs: [
    {
      Preface: ['introduction', 'landscape'],
    },
    {
      'Step 1: Prepare a FAANG-ready resume': [
        'resume/guide',
        'resume/ats-proof-template',
        'resume/write-effective-content',
        'resume/optimize-resume',
        'resume/free-tools-to-review-resume',
        'resume/final-tips',
      ],
    },
    {
      type: 'category',
      label: 'Step 2: Ace the interview',
      collapsed: false,
      items: [
        {
          'Interview formats': [
            'interview-formats',
            'interview-formats-top-companies',
          ],
        },
        'self-introduction',
        {
          '🔥 Coding interviews': [
            'coding-interview',
            'picking-a-language',
            'study-and-practice',
            'best-coding-interview-courses',
            'best-practice-questions',
            'during-coding-interview',
            'cheatsheet',
            'coding-signals',
            'mock-interviews',
          ],
        },
        'system-design',
        {
          'Behavioral interviews': [
            'behavioral-interview',
            'star-format',
            'behavioral-questions',
            'psychological-tricks',
          ],
        },
        'questions-to-ask',
      ],
    },
    {
      'Step 3: Negotiate the best offer': [
        'understanding-compensation',
        'negotiation',
        'negotiation-rules',
      ],
    },
    {
      'Step 4: Prepare for the job': [
        'choosing-between-companies',
        'engineering-levels',
        // 'team-selection',
      ],
    },
    {
      'Algorithms cheatsheets': [
        'algorithms/algorithms-introduction',
        {
          Basics: [
            'algorithms/array',
            'algorithms/string',
            'algorithms/sorting-searching',
            'algorithms/recursion',
            'algorithms/hash-table',
          ],
          'Data structures': [
            'algorithms/linked-list',
            'algorithms/queue',
            'algorithms/stack',
          ],
          'Non-linear data structures': [
            'algorithms/tree',
            'algorithms/heap',
            'algorithms/graph',
            'algorithms/trie',
            'algorithms/matrix',
            'algorithms/interval',
          ],
          Additional: [
            'algorithms/binary',
            'algorithms/math',
            'algorithms/geometry',
            'algorithms/dynamic-programming',
          ],
        },
      ],
    },
    {
      Misc: ['interviewer-cheatsheet'],
    },
  ],
};
