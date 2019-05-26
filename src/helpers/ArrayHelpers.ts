export default class ArrayHelpers {
  findOrFail = <T>(arr: T[], func: (el: T) => boolean) => {
    const match = arr.find(func);
    if (!match) {
      throw new Error("Not found!");
    }
    return match;
  };
}
