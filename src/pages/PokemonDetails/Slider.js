import { SliderCss } from "./Slider.module.css";

const Slider = () => {
  <div class="container">
    <div class="switches-container">
      <input
        type="radio"
        id="switchMonthly"
        name="switchPlan"
        value="Monthly"
        checked="checked"
      />
      <input type="radio" id="switchYearly" name="switchPlan" value="Yearly" />
      <label for="switchMonthly">Monthly</label>
      <label for="switchYearly">Yearly</label>
      <div class="switch-wrapper">
        <div class="switch">
          <div>Monthly</div>
          <div>Yearly</div>
        </div>
      </div>
    </div>
    <p>
      <small>NB: Input radios are used toggle the switch state.</small>
    </p>
  </div>;
};

export default Slider;
