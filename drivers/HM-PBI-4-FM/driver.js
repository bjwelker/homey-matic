'use strict';

const Homey = require('homey');
const Driver = require('../../lib/driver.js');

class HomematicDriver extends Driver {

    onInit() {
        super.onInit();
        this.capabilities = [];
        this.homematicTypes = ['HM-PBI-4-FM'];
        this.log(this.homematicTypes.join(','), 'has been inited');

        this._flowTriggerButtonPressed = new Homey.FlowCardTriggerDevice('HM-PBI-4-FM-press')
            .register()
            .registerRunListener((args, state) => {
                if (args.button == state.button && args.pressType == state.pressType) {
                    return Promise.resolve(true)
                } else {
                    return Promise.reject(false)
                }
            })
    }

    triggerButtonPressedFlow(device, tokens, state) {
        this._flowTriggerButtonPressed
            .trigger(device, tokens, state)
            .catch(this.error)
    }
}

module.exports = HomematicDriver;