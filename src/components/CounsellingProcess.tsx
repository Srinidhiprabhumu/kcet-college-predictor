import { ChevronDown } from 'lucide-react';

const steps = [
  {
    title: 'Result Declaration & Registration',
    description: 'KEA releases the KCET results. Candidates register for counselling on the KEA portal, submitting required documents.',
  },
  {
    title: 'Document Verification',
    description: 'Visit designated KEA help centres with originals and photocopies. You receive a verification slip and Secret Key for option entry.',
  },
  {
    title: 'Web Option Entry (Choice Filling)',
    description: 'Log in with CET number and Secret Key. Add, modify, or reorder college-course choices. Lock in the final preference list before the deadline.',
  },
  {
    title: 'Mock Allotment Rounds',
    description: 'Practice rounds to show your likely seat. You can refine choices after each mock round. These rounds are only for practice—you don\'t report to colleges.',
  },
  {
    title: 'Round 1 Seat Allotment',
    description: 'Provisional allotment is released. You must decide: Freeze (accept), Float (accept and upgrade), Slide (accept branch, upgrade college), or Exit.',
  },
  {
    title: 'Seat Acceptance & Reporting',
    description: 'Pay the admission fee and download the Admission Order. Report to the allotted college within the deadline.',
  },
  {
    title: 'Round 2 Seat Allotment',
    description: 'Open to those who chose Float/Slide or didn\'t get a seat. Similar process to Round 1.',
  },
  {
    title: 'Extended Round / Bonus Round',
    description: 'Held if seats remain vacant after Round 2. Choice entry is allowed for previously unallotted candidates.',
  },
  {
    title: 'Special or Casual Vacancy Round',
    description: 'If seats are still vacant, KEA may conduct a Special Round to exhaust available seats.',
  },
  {
    title: 'Final Reporting and Admission',
    description: 'After the last round, successful candidates must pay fees and report to colleges to finalize admission.',
  },
];

export function CounsellingProcess() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">KCET Counselling Process</h2>
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gray-200"></div>
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-center">
              {index % 2 === 0 ? (
                <>
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                      <h3 className="text-xl font-semibold text-indigo-600">{step.title}</h3>
                      <p className="mt-2 text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="w-1/2 pl-8"></div>
                </>
              ) : (
                <>
                  <div className="w-1/2 pr-8"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="w-1/2 pl-8 text-left">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                      <h3 className="text-xl font-semibold text-indigo-600">{step.title}</h3>
                      <p className="mt-2 text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}