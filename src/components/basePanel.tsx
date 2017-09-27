import * as React from "react";
import { Panel, PanelType } from "office-ui-fabric-react";
import { IBasePanelProps, IBasePanelState } from "../definitions";

/**
 * Base Panel
 */
export class BasePanel<Props extends IBasePanelProps = IBasePanelProps, State extends IBasePanelState = IBasePanelState> extends React.Component<Props, State> {
    /**
     * Constructor
     * @param props - The base panel properties.
     */
    constructor(props: Props) {
        super(props);

        // Set the state
        this.state = { visible: false } as State;
    }

    /**
     * Public Interface
     */

    /**
     * Method to hide the panel
     */
    hide = () => {
        // Update the state
        this.setState({ visible: false });
    }

    /**
     * Method to render the component
     */
    render() {
        return (
            <Panel {...this.props} isOpen={typeof (this.props.isOpen) === "boolean" ? this.props.isOpen : this.state.visible} onDismiss={this.hide}>
                {this.props.children}
            </Panel>
        );
    }

    /**
     * Method to show the panel
     */
    show = () => {
        // Update the state
        this.setState({ visible: true });
    }
}