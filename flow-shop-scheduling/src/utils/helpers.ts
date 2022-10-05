export const getMatrixByColumns = (matrix: number[][]) => {
    const columnMatrix: number[][] = [];
    for (let i = 0; i < matrix[0].length; i++) {
        let column: number[] = [];
        for (let j = 0; j < matrix.length; j++) {
            column.push(matrix[j][i]);
        }
        columnMatrix.push(column);
    }
    return columnMatrix;
};