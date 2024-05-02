export class Frame {
  constructor(props: Frame) {
    this.frame = props.frame;
    this.timestamp = props.timestamp;
  }

  readonly frame: string;
  readonly timestamp: string;
}
