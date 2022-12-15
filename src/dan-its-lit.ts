import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import fireIcon from './assets/fire-icon.svg'

/**
 * An example element to count user clicks.
 */
@customElement('dan-its-lit')
export class DanItsLit extends LitElement {
  /**
   * Whether or not the users are allowed to click only one time to increase the counter.
   */
  @property({
    type: Boolean,
    attribute: 'allows-one-time-click',
  })
  allowsOneTimeClick: boolean = false;

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0
  
  /**
   * The label of the button, which can change according to the count of clicks.
   */
  @state()
  private _label: string = 'Light it up!';

  /**
   * Whether or not the button has been clicked
   */
  private _hasBeenClicked: boolean = false;

  render() {
    this._updateLabel()
    const currentCount = this.count > 0 ? ` x${this.count}` : '';

    return html`
      <button type="button" @click=${this._litHandler} aria-label="Counter">
        <img
          src=${fireIcon}
          class="button__icon ${this.count > 0 ? 'button__icon__is-lit' : ''}"
          alt="Dan's fire icon"
        />${currentCount} | <span class="label">${this._label}</span>
      </button>
    `
  }

  /**
   * Handles the click event of the button.
   *
   * If the user is allowed to click multiple times, the counter
   * will increase. Otherwise, it will go back to the original value.
   *
   * @param _event The click event
   */
  private _litHandler(_event: Event): void {
    if (this.allowsOneTimeClick && this._hasBeenClicked) {
      // Disable button and assign class 
      this._hasBeenClicked = false;
      this.count -= 1;

      return;
    }

    // Trigger icon and button animation

    this._hasBeenClicked = true;
    this.count += 1;
  }

  /**
   * Updates the button's label and triggers an animation if the counter is increasing.
   * 
   * @param {boolean} isIncreasing Whether or not the label should be updated because of an increase in the counter
   */
  private _updateLabel() {
    if (this.count < 1) {
      this._label = 'Light it up!';
    } else if (this.count < 5) {
      this._label = 'Heating up!';
    } else if (this.count < 50) {
      this._label = 'Fire rises!';
    } else if (this.count < 500) {
      this._label = 'Burn, baby!';
    } else {
      this._label = 'Supernova!';
    }
  }

  /**
   * TODO: Include the svg code directly in the template and animate flames' color, position, and size.
   * TODO: Maybe add smoke clouds behind the button after clicking.
   * TODO: Maybe add a tiny satan, if it's OK with the target demographic.
   */
  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .button__icon {
      height: 1em;
      will-change: filter;
      opacity: 0.5;
    }
    .button__icon__is-lit {
      opacity: 1;
      animation-name: burn, burn-alive;
      animation-duration: 1s, 100ms;
      animation-iteration-count: 1, infinite;
      animation-direction: normal, alternate;
    }
    button:hover .button__icon {
      opacity: .80;
    }
    button:focus .button__icon,
    button:focus-visible .button__icon {
      opacity: 1;
    }

    .label {
      font-style: italic;
    }

    button {
      border-radius: 0;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
      transition: background-color ease-out 0.25s;
    }
    button:hover {
      border-color: darkred;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto darkred;
    }
    button:active {
      background-color: white;
      color: darkred;
    }

    @keyframes burn {
      from {
        scale: 1;
        rotate: 0;
      }

      10% {
        scale: 10;
      }

      20% {
        scale: 5;
      }

      50% {
        scale: 1.5;
      }
    
      to {
        scale 1;
        rotate: 0;
      }
    }

    @keyframes burn-alive {
      from {
        rotate: -10deg;
      }
    
      to {
        rotate: 10deg;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'dan-its-lit': DanItsLit
  }
}
