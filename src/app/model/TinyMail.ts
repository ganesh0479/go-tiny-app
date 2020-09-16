export class TinyMail {
  public mailRequests: TinyMailRequest[] = [];
  public to: string;
  public from: string;
}

export class TinyMailRequest {
  public title: string;
  public description: string;
  public tinyUrl: string;
}
