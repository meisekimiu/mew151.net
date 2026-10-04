import { Component, Prop, State, h } from '@stencil/core';

const DaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MonthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@Component({
  tag: 'mew151-rss-date-calculator',
  styleUrl: 'mew151-rss-date-calculator.css',
  shadow: true,
})
export class Mew151RssDateCalculator {
  private date: Date = new Date();

  private inputElement!: HTMLInputElement;

  /**
   * Allows us to force a timezone output for testing purposes.
   */
  @Prop() public forcedTimezoneOffset: number = new Date().getTimezoneOffset();

  /**
   * Allows us to force a fixed 'current' date for testing purposes.
   * @returns A factory function for providing a new date
   */
  @Prop() public newDateProvider: () => Date = () => new Date();

  @State() private rfcDateString: string = '';

  public componentWillLoad(): void {
    this.useCurrentDate();
  }

  private onDateChange(target: EventTarget): void {
    const input = target as HTMLInputElement;
    this.date = new Date(this.addMidnightIfOnlyDate(input.value));
    this.updateDateString();
  }

  private addMidnightIfOnlyDate(dateString: string): string {
    if (dateString.trim().match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
      return dateString + ' 00:00:00';
    }
    return dateString;
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }

  private getTime(): string {
    return [this.date.getHours(), this.date.getMinutes(), this.date.getUTCSeconds()].map(this.padNumber).join(':');
  }

  private getTimezoneOffset(): string {
    if (this.forcedTimezoneOffset === 0) {
      return 'GMT';
    }
    const hourOffset = Math.trunc(this.forcedTimezoneOffset / 60);
    const minuteOffset = (this.forcedTimezoneOffset / 60 - hourOffset) * 60;
    return `${Math.sign(this.forcedTimezoneOffset) > 0 ? '-' : '+'}${this.padNumber(Math.abs(hourOffset))}${this.padNumber(Math.abs(minuteOffset))}`;
  }

  private updateDateString(): void {
    if (Number.isNaN(this.date.getDate())) {
      this.rfcDateString = 'Invalid date!';
      return;
    }
    this.rfcDateString = `${DaysOfWeek[this.date.getDay()]}, ${this.padNumber(this.date.getDate())} ${MonthsOfYear[this.date.getMonth()]} ${this.date.getFullYear()} ${this.getTime()} ${this.getTimezoneOffset()}`;
  }

  private useCurrentDate(): void {
    this.date = this.newDateProvider();
    if (this.inputElement) {
      this.inputElement.value = this.date
        .toISOString()
        .replace(/T|Z|\.\d\d\d/g, ' ')
        .trim();
    } else {
      setTimeout(() => this.useCurrentDate(), 0);
    }
    this.updateDateString();
  }

  public render() {
    return (
      <div>
        <div class="input-line">
          <label htmlFor="input-date">Date: </label>
          <input
            type="text"
            class="input-date"
            id="input-date"
            onChange={event => this.onDateChange(event.target!)}
            onKeyUp={event => this.onDateChange(event.target!)}
            ref={el => (this.inputElement = el as HTMLInputElement)}
          />
          <button class="current-date-button" onClick={() => this.useCurrentDate()}>
            Set To Current Date
          </button>
        </div>
        <div class="output">{this.rfcDateString}</div>
      </div>
    );
  }
}
