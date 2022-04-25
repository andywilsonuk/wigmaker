export * from "./state"

// eslint-disable-next-line no-bitwise
export const combineFlags = (...flags) => flags.reduce((a, b) => a | b)
export const mockSequence = (...values) => values.reduce((a, b) => a.mockReturnValueOnce(b), jest.fn()).mockImplementation(() => { throw new Error("Mock sequence depleted") })
