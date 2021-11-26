export class Logger {
  static success<T>(msg: T): void {
    // green
    console.log(msg);
  }

  static highlight<T>(msg: T): void {
    // yellow
    console.log(msg);
  }

  static danger<T>(msg: T): void {
    // red
    console.log(msg);
  }

  static primary<T>(msg: T): void {
    // blueBright
    console.log(msg);
  }

  static end<T>(msg: T): void {
    // magenta
    console.log(msg);
  }

  static performance(t2: number, t1: number): void {
    this.highlight(
      `Time to execute (in seconds): ${((t2 - t1) / 1000).toFixed(2)}`
    );
  }
}
