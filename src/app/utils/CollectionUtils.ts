export class CollectionUtils {
  public static range(n: number): number [] {
    const values = [];
    for (let i = 0; i < n; i++) {
      values.push(i);
    }
    return values;
  }
}