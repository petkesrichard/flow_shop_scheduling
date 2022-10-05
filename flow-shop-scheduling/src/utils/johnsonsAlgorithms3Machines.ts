import { getMatrixByColumns } from "./helpers";

let columns: number[][] = []; // machine with all jobs

const canApplyJohnsonsAlgorithm = (jobs: number[][]): boolean => {
  columns = getMatrixByColumns(jobs);
  return Math.max(...columns[1]) <=  Math.min(...columns[0]) ||  Math.max(...columns[1]) <= Math.min(...columns[2]);
};

// calculate processing time for M1+M2 and M2+M3
const calculateProcessingTimeSumTwoMachines = () => {
    const m1m2 = columns[0].map((nr, i) => nr + columns[1][i]);
    const m2m3 = columns[1].map((nr, i) => nr + columns[2][i]);
    return {m1m2, m2m3};
};

// get optimum jobs sequence that minimizes makespan
const getOptimumSequence = (m1m2: number[], m2m3: number[]) => {
    const jobsOrder: number[] = [];
    const m1m2Copy: number[] = [...m1m2];
    const m2m3Copy: number[] = [...m2m3];
    for(let i = 0; i < m1m2.length; i++) {
       const m1m2Min: number = Math.min(...m1m2Copy);
       const m2m3Min: number = Math.min(...m2m3Copy);
       if (m1m2Min <= m2m3Min) {
        jobsOrder.push(m1m2.indexOf(m1m2Min));
        m2m3Copy.splice(m1m2Copy.indexOf(m1m2Min), 1)
        m1m2Copy.splice(m1m2Copy.indexOf(m1m2Min), 1);
       } else {
        jobsOrder.push(m2m3.indexOf(m2m3Min));
        m1m2Copy.splice(m2m3Copy.indexOf(m2m3Min), 1);
        m2m3Copy.splice(m2m3Copy.indexOf(m2m3Min), 1)
       }
    }
   return jobsOrder;
}

const calculateCompletionTime = (jobs: number[][], jobsOrder: number[]) => {
    const orderedJobs: number[][] = [];
    const jobsCopy = [...jobs];
    jobsOrder.map(jobOrderIndex => {
        orderedJobs.push(jobs[jobOrderIndex]);
    });
    for (let i = 0; i < orderedJobs.length; i++) {
        for (let j = 0; j < orderedJobs[i].length; j++) {
            if (i > 0 && j === 0) {
                orderedJobs[i][j] += orderedJobs[i - 1][j];
            }
            if (i > 0 && j === orderedJobs[i].length - 1) {
                orderedJobs[i][j] += orderedJobs[i-1][j];
            } else
            if (j > 0) {
                orderedJobs[i][j] += orderedJobs[i][j - 1];
            }
        }
    }
   return {completionTime: orderedJobs, makeSpan: orderedJobs[orderedJobs.length-1][orderedJobs[orderedJobs.length-1].length-1]};
};

export const calculateWithJohnsonsAlgorithm = (jobs: number[][]) => {
    console.log({jobs});
    if (canApplyJohnsonsAlgorithm(jobs)) {
     // calculate Processing time for m1 + m2, m2 + m3 machines
     const { m1m2, m2m3 } = calculateProcessingTimeSumTwoMachines();
     console.log({m1m2, m2m3});
     // find optimum order for jobs when entering the machines
     const optimumJobSequnce: number[] = getOptimumSequence(m1m2, m2m3);
     console.log({optimumJobSequnce});
     const { completionTime, makeSpan } = calculateCompletionTime(jobs, optimumJobSequnce);
     console.log({completionTime, makeSpan});
    } else {
     console.log(`can't apply Johnsons algorithm`);
    }
 };