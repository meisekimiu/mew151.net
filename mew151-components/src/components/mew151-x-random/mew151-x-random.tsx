import { Component, Prop, h } from '@stencil/core';
import * as defaultSayings from './default-sayings';
import pickRandom from '../../shared/util/pick-random';

type ToyType = 'catclock' | 'cowsay' | 'xeyes';

/** The main component that shows UNIX desktop toys on Mew151.net! */
@Component({
  tag: 'mew151-x-random',
  styleUrl: 'mew151-x-random.css',
  shadow: true,
})
export class Mew151XRandom {
  /** Allows a page to force a specific desktop toy to appear */
  @Prop() public forceSelection: ToyType | undefined;

  /** Odds of biblically accurate xeyes */
  @Prop() public biblicallyAccurateOdds: number = 1 / 48;

  /** Odds of getting a The Residents xeyes */
  @Prop() public residentOdds: number = 0;

  /** The color of the cat clock's tie */
  @Prop() public tieColor: string | undefined;

  private toyType: ToyType | undefined;
  private biblicallyAccurate: boolean = false;
  private residentsMode: boolean = false;
  private message: string = '';

  public componentWillLoad(): void {
    if (this.forceSelection) {
      this.toyType = this.forceSelection;
    } else {
      this.toyType = pickRandom(['catclock', 'cowsay', 'xeyes']);
    }
    if (this.toyType === 'xeyes') {
      this.biblicallyAccurate = this.getRandomNumber() < this.biblicallyAccurateOdds;
      this.residentsMode = this.getRandomNumber() < this.residentOdds;
    }
    if (this.toyType === 'catclock') {
      const date = new Date();
      if (date.getMonth() === 5) {
        // Is it gay month? Also I hate how months are 0-indexed.
        if (this.getRandomNumber() < 0.95) {
          this.tieColor = pickRandom(['pride', 'lesbian', 'transgender', 'asexual']);
        }
      }
      if (this.getRandomNumber() < 1 / 12 || (window as any)['specialDay']) {
        this.tieColor = 'rainbow';
      }

      // Trans days of visibility, rememberance
      if ((date.getMonth() === 2 && date.getDate() === 31) || (date.getMonth() === 10 && date.getDate() === 20)) {
        this.tieColor = 'transgender';
      }

      // Lesbian visibility day
      if (date.getMonth() === 3 && date.getDate() === 26) {
        this.tieColor = 'lesbian';
      }

      // Asexual visibility day
      if (date.getMonth() === 3 && date.getDate() === 6) {
        this.tieColor = 'asexual';
      }
    }
    this.setAppName();
    this.loadMessage();
  }

  private setAppName(): void {
    const appWindow = document.getElementById('toy-app-window');
    if (appWindow) {
      appWindow.style.visibility = 'visible';
      appWindow.classList.add(this.toyType!);
    }
    const titleSpan = document.getElementById('toy-app-name');
    if (!titleSpan) {
      return;
    }
    switch (this.toyType) {
      case 'catclock':
        titleSpan.innerText = 'xclock';
        return;
      case 'xeyes':
        titleSpan.innerText = 'xeyes';
        return;
      case 'cowsay':
        titleSpan.innerText = 'guest@mew151.net:~';
        return;
    }
  }

  /** Gets a random number from 0 to 1... but it's slightly modified for "special days". */
  private getRandomNumber(): number {
    return Math.random() * ((window as any)['specialDay'] ? 1 / 3 : 1.0);
  }

  private loadMessage(): void {
    const messageProgram = (window as any).unixMessages;
    if (messageProgram) {
      switch (this.toyType) {
        case 'catclock':
          if (messageProgram.catclock) {
            this.message = pickRandom(messageProgram.catclock);
          }
          break;
        case 'xeyes':
          if (this.biblicallyAccurate) {
            if (messageProgram.biblical) {
              this.message = pickRandom(messageProgram.biblical);
              break;
            }
          }
          this.message = pickRandom(messageProgram.xeyes);
          break;
        case 'cowsay':
          if (messageProgram.cowsay) {
            this.message = pickRandom(messageProgram.cowsay);
          }
          break;
      }
    }
    if (!this.message || (messageProgram?.allowFallback && Math.random() < 0.5 && !this.biblicallyAccurate)) {
      this.message = pickRandom(this.getDefaultMessageSource());
    }
  }

  private getDefaultMessageSource(): string[] {
    const source: string[] = [];
    source.push(...defaultSayings.defaultAnyoneSayings);
    switch (this.toyType) {
      case 'catclock':
        source.push(...defaultSayings.defaultCatClockSayings);
        break;
      case 'xeyes':
        source.push(...(this.biblicallyAccurate ? defaultSayings.defaultBiblicalSayings : defaultSayings.defaultEyesSayings));
        break;
      default:
        source.push(...defaultSayings.defaultCowSayings);
    }
    return source;
  }

  private getToy(): HTMLElement {
    switch (this.toyType) {
      case 'catclock':
        return <mew151-x-catclock color={this.tieColor}></mew151-x-catclock>;
      case 'xeyes':
        return <mew151-x-xeyes biblicallyAccurate={this.biblicallyAccurate} theResidentsMode={this.residentsMode}></mew151-x-xeyes>;
    }
    const eyes = pickRandom([
      'oO',
      'Oo',
      'xX',
      '^^',
      '--',
      "''",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]);
    const mouth = pickRandom([undefined, undefined, undefined, undefined, undefined, undefined, ' U', 'U ', 'vv']);
    return <mew151-x-cowsay eyes={eyes} mouth={mouth} text={this.message}></mew151-x-cowsay>;
  }

  render() {
    const messageDiv =
      this.toyType !== 'cowsay' ? (
        <div class={'message-container ' + this.toyType + '-message-container'}>
          <div class={'message ' + this.toyType + '-message'}>{this.message}</div>
        </div>
      ) : null;
    return (
      <aside class="unix-toy">
        <div class="app">{this.getToy()}</div>
        {messageDiv}
      </aside>
    );
  }
}
