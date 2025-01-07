class Logger {
  public log(message: string) {
    console.log(message);
  }

  public error(message: string, error?: Error) {
    console.error(message, error);
  }

  public warn(message: string) {
    console.warn(message);
  }
}

export const logger = new Logger();