import * as React from "react";
import { Panel, PanelType } from "office-ui-fabric-react";
import { IBasePanelProps, IBasePanelState } from "../definitions";

/**
 * Base Panel
 */
export class BasePanel<Props extends IBasePanelProps = IBasePanelProps, State extends IBasePanelState = IBasePanelState> extends React.Component<Props, State> {
    /**
     * Constructor
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = {
            visible: typeof (props.isOpen) === "boolean" ? props.isOpen : false
        } as any;
    }

    /**
     * Public Interface
     */

    // Method to hide the panel
    hide = () => {
        // Update the state
        this.setState({ visible: false });
    }

    // Method to render the component
    render() {
        return (
            <Panel {...this.props} isOpen={this.state.visible} onDismiss={this.hide}>
                {this.props.children}
            </Panel>
        );
    }

    // Method to show the panel
    show = () => {
        // Update the state
        this.setState({ visible: true });
    }
}