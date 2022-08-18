export const ShiftObj = () => {
    let shift = {
        shiftId: null,
        lunch: BreakObj,
        break: BreakObj
    }
}

export const BreakObj = () => {
    return {};
}

export const ProcessError = (e) => {
    return e.data.error
}