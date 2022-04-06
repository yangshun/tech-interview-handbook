import React from 'react';

import QuestionGroups from './QuestionGroups.json';

export default function QuestionList() {
  return (
    <div className="padding-vert--lg">
      {Object.entries(QuestionGroups).map(
        ([sectionTitle, questions], index) => (
          <div className="margin-bottom--lg" key={sectionTitle}>
            <h4>Week {index + 5}</h4>
            <table>
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Difficulty</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question.slug}>
                    <td>
                      <a
                        href={question.url}
                        target="_blank"
                        rel="noopener noreferer">
                        {question.title}
                      </a>
                    </td>
                    <td>{question.difficulty}</td>
                    <td>{question.duration} mins</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      )}
    </div>
  );
}
