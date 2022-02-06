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
            {
              'Study and practice': [
                'study-and-practice',
                'best-practice-questions',
              ],
            },
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
      'Algorithms tips': [
        'algorithms/algorithms-introduction',
        'algorithms/array',
        'algorithms/binary',
        'algorithms/dynamic-programming',
        'algorithms/geometry',
        'algorithms/graph',
        'algorithms/hash-table',
        'algorithms/heap',
        'algorithms/interval',
        'algorithms/linked-list',
        'algorithms/math',
        'algorithms/matrix',
        'algorithms/oop',
        'algorithms/permutation',
        'algorithms/queue',
        'algorithms/recursion',
        'algorithms/sorting-searching',
        'algorithms/stack',
        'algorithms/string',
        'algorithms/tree',
        'algorithms/trie',
      ],
    },
    {
      Misc: ['interviewer-cheatsheet'],
    },
  ],
};
