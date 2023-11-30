module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      collapsible: false,
      items: ['software-engineering-interview-guide'],
    },
    {
      type: 'category',
      label: 'Getting an interview',
      collapsible: false,
      items: ['resume'],
    },
    {
      type: 'category',
      label: 'Coding interview preparation',
      collapsible: false,
      items: [
        'coding-interview-prep',
        'programming-languages-for-coding-interviews',
        'coding-interview-study-plan',
        'coding-interview-cheatsheet',
        'coding-interview-techniques',
        'mock-interviews',
        'coding-interview-rubrics',
      ],
    },
    {
      type: 'category',
      label: 'System design interview preparation',
      collapsible: false,
      items: ['system-design'],
    },
    {
      type: 'category',
      label: 'Behavioral interview preparation',
      collapsible: false,
      items: [
        'behavioral-interview',
        'behavioral-interview-rubrics',
        'behavioral-interview-questions',
        'self-introduction',
        'final-questions',
      ],
    },
    {
      'Salary and offer negotiation preparation': [
        'understanding-compensation',
        'negotiation',
        'negotiation-rules',
        'choosing-between-companies',
      ],
    },
    {
      'Algorithms study cheatsheets': [
        'algorithms/study-cheatsheet',
        {
          type: 'category',
          label: 'Basics',
          collapsible: false,
          items: [
            'algorithms/array',
            'algorithms/string',
            'algorithms/hash-table',
            'algorithms/recursion',
            'algorithms/sorting-searching',
          ],
        },
        {
          type: 'category',
          label: 'Data structures',
          collapsible: false,
          items: [
            'algorithms/matrix',
            'algorithms/linked-list',
            'algorithms/queue',
            'algorithms/stack',
            'algorithms/interval',
          ],
        },
        {
          type: 'category',
          label: 'Advanced data structures',
          collapsible: false,
          items: [
            'algorithms/tree',
            'algorithms/graph',
            'algorithms/heap',
            'algorithms/trie',
          ],
        },
        {
          type: 'category',
          label: 'Additional',
          collapsible: false,
          items: [
            'algorithms/dynamic-programming',
            'algorithms/binary',
            'algorithms/math',
            'algorithms/geometry',
          ],
        },
      ],
    },
    {
      'Beyond the interview': [
        'interview-formats-top-companies',
        'landscape',
        'engineering-levels',
        'career-growth',
        'interviewer-cheatsheet',
        'best-coding-interview-courses',
        'best-practice-questions',
      ],
    },
  ],
};
