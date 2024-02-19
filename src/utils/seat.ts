export const generateSeatNumber = (code: string, row: number, column: number) => {
    const seats = []
    for (let i = 1; i <= row; i++) {
        for (let j = 65; j <= (65 + column); j++) {
            seats.push(`${code}${i}${String.fromCharCode(j)}`);
        }
    }

    return seats;
}