module.exports = {
  docs: [
    {
      Preface: ['introduction', 'landscape'],
    },
    {
      'Step 1: Preparing your resume': [
        'resume',
        'resume-checklist',
        'resume-case-study',
        'resume-sample',
        'cover-letter',
      ],
    },
    {
      type: 'category',
      label: 'Step 2: Acing the interview',
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
            'best-practice-questions',
            'during-coding-interview',
            'cheatsheet',
            'coding-signals',
            'mock-interviews',
            'interviewer-cheatsheet',
            {
              Algorithms: [
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
      'Step 3: Negotiating the best offer': [
        'understanding-compensation',
        'negotiation',
      ],
    },
    {
      'Step 4: Getting ready for your job': [
        'choosing-between-companies',
        'engineering-levels',
        // 'team-selection',
      ],
    },
  ],
};
