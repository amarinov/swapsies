class Logger {
  public log(message: string) {
    console.log(message);
  }

  public error(message: string, meta?: unknown) {
    console.error(message, meta);
  }

  public warn(message: string) {
    console.warn(message);
  }
}

export const logger = new Logger();