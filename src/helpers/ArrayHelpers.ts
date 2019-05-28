export default class ArrayHelpers {
  findOrFail = <T>(arr: T[], func: (el: T) => boolean) => {
    const match = arr.find(func);
    if (!match) {
      throw new Error("Not found!");
    }
    return match;
  };

  incremental = (length: number, offset: number = 0) =>
    new Array(length).fill(null).map((_, i) => i + offset);
}
