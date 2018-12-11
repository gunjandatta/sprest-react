import * as React from "react";
import { Panel as FabricPanel } from "office-ui-fabric-react";
import { IBasePanel, IBasePanelProps, IBasePanelState } from "./types";

/**
 * Panel
 */
export class Panel<Props extends IBasePanelProps = IBasePanelProps, State extends IBasePanelState = IBasePanelState> extends React.Component<Props, State> implements IBasePanel<Props, State> {
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
        // Call the on dismiss event
        this.props.onDismiss ? this.props.onDismiss() : null;

        // Update the state
        this.setState({ visible: false });
    }

    /**
     * Method to render the component
     */
    render() {
        return (
            <FabricPanel {...this.props} isOpen={typeof (this.props.isOpen) === "boolean" ? this.props.isOpen : this.state.visible} onDismiss={this.hide}>
                {this.props.children}
            </FabricPanel>
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