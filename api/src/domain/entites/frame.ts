export class Frame {
  constructor(props: Frame) {
    this.id = props.id;
    this.data = props.data;
    this.timestamp = props.timestamp;
  }

  readonly id: string;
  readonly data: string;
  readonly timestamp: string;
}
