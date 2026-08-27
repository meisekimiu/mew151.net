import { Component, h, Prop } from '@stencil/core';
import { say } from 'cowsay';
import wrap from 'word-wrap';

/** Renders cowsay in a "terminal" */
@Component({
  tag: 'mew151-x-cowsay',
  styleUrl: 'mew151-x-cowsay.css',
  shadow: true,
})
export class Mew151XCowsay {
  /** The text for the cow to say */
  @Prop() public text: string = 'Moo!';

  /** Replacement eyes for the cow */
  @Prop() public eyes: string | undefined;

  /** Replacement tongue for the cow */
  @Prop() public mouth: string | undefined;

  render() {
    const options = {
      text: wrap(this.text, { width: 30 }),
      eyes: this.eyes,
      tongue: this.mouth,
      wrapLength: 1e10, // Ignore wrapping because we're going to be using word-wrap instead for cleaner lines
    };
    const altText = `ASCII art of a cow with a speech bubble that says: "${this.text}"`;
    return (
      <div class="cowsay">
        <div role="img" aria-label={altText}>
          {say(options)}
        </div>
      </div>
    );
  }
}
