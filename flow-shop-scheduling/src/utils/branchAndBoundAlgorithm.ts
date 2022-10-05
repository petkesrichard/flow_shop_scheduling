import { getMatrixByColumns } from "./helpers";

let jobs: number[][] = [];
let columns: number[][] = []; // machine with all jobs
let processingTimes: number[] = [];

const calculateProcessingTimesForEachMachine = () => {
   columns = getMatrixByColumns(jobs);
   const processingTimes: number[] = [];
   for(let i = 0; i < columns.length; i++) {
     // each machine s processing time, lower bound to the makespan
     const processingTime = columns[i].reduce((partialSum, a) => partialSum + a, 0);
     processingTimes.push(processingTime);
   }
   return processingTimes;
};

const calculateLowerBoundsMachines = (columnsJobs: number[][]) => {
   const m1m2 = columnsJobs[0].map((nr, i) => nr + columnsJobs[1][i]);
   const m2m3 = columnsJobs[1].map((nr, i) => nr + columnsJobs[2][i]);
   const m1m3 = columnsJobs[2].map((nr, i) => nr + columnsJobs[0][i]);
   const lowerBoundM1 = Math.min(...m2m3) + processingTimes[0];
   const lowerBoundM2 = Math.min(...columnsJobs[0]) + processingTimes[1] + Math.min(...columnsJobs[2]);
   const lowerBoundM3 = Math.min(...m1m2) + processingTimes[2];
   return [lowerBoundM1, lowerBoundM2, lowerBoundM3];
};

const calculateBranchAndBoundTree = () => {
   const firstJobOrder: number[] = [];
   const jobsNr: number[] = [];
   columns[0].forEach((_, index) => jobsNr.push(index)); // array of job ids
   for (let jobIndex = 0; jobIndex < jobsNr.length; jobIndex++) {  
    const m1m2 = columns[0].map((nr, i) => nr + columns[1][i]);
    const m2m3 = columns[1].map((nr, i) => nr + columns[2][i]);
    const m1m3 = columns[2].map((nr, i) => nr + columns[0][i]);
    m1m2.splice(jobIndex, 1);
    m2m3.splice(jobIndex, 1);
    m1m3.splice(jobIndex, 1); 
    console.log({jobIndex, m1m2, m2m3, m1m3});
    const lowerBoundM1 = Math.min(...m2m3) + processingTimes[0];
    const lowerBoundM2 = columns[0][jobIndex] + processingTimes[1] + Math.min(...removeRowFromColumn(columns[2], jobIndex));
    const lowerBoundM3 = (columns[0][jobIndex] + columns[1][jobIndex]) + processingTimes[2];
    console.log({lowerBoundM1, lowerBoundM2, lowerBoundM3});
    firstJobOrder.push(Math.max(...[lowerBoundM1, lowerBoundM2, lowerBoundM3]));
   }
   const jobsOrder: number[] = [firstJobOrder.indexOf(Math.min(...firstJobOrder))];
   jobsNr.splice(jobsOrder[0], 1);
   console.log({jobsOrder, jobsNr})
   for (let jobIndex = 0; jobIndex < jobsNr.length - 1; jobIndex++) { // calculate partial sequences

   }
   console.log({jobsOrder});
};

const removeRowFromColumn = (column: number[], index: number) => {
   const columnCopy: number[] = [...column];
   columnCopy.splice(index, 1);
   return columnCopy;
};

export const calculateWithBranchAndBoundAlgorithm = (jobsMatrix: number[][]) => {
  jobs = jobsMatrix;
  processingTimes = calculateProcessingTimesForEachMachine();
  const lowerBounds = calculateLowerBoundsMachines(columns);
  const maxLowerBound = Math.max(...lowerBounds);
  const lowerBoundMachine = lowerBounds.indexOf(maxLowerBound);
  console.log({lowerBounds, processingTimes});
  console.log({maxLowerBound, lowerBoundMachine});
  console.log({columns, jobs});
  calculateBranchAndBoundTree();
};