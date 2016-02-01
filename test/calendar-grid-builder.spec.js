import {buildCalendarGrid as buildGrid} from '../src/calendar-grid-builder';

describe('Calendar grid builder', () => {

    it('should build grid with 30 days starting on Sunday', () => {
        expect(buildGrid(30, 0)).toEqual([
            [1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19, 20, 21],
            [22, 23, 24, 25, 26, 27, 28],
            [29, 30, null, null, null, null, null]
        ]);
    });

    it('should build grid with 31 days starting on Thursday', () => {
        expect(buildGrid(31, 4)).toEqual([
            [null, null, null, null, 1, 2, 3],
            [4, 5, 6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21, 22, 23, 24],
            [25, 26, 27, 28, 29, 30, 31]
        ]);
    });

    it('should build grid with 6 weeks', () => {
        expect(buildGrid(31, 5)).toEqual([
            [null, null, null, null, null, 1, 2],
            [3,  4,  5,  6,  7,  8,  9],
            [10, 11, 12, 13, 14, 15, 16],
            [17, 18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29, 30],
            [31, null, null, null, null, null, null]
        ]);
    });
});
