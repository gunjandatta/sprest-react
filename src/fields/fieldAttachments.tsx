import * as React from "react";
import { SPTypes, Types, Web } from "gd-sprest";
import {
    Label, Link,
    Spinner
} from "office-ui-fabric-react";
import {
    IAttachmentFile, IFieldAttachment, IFieldAttachmentsProps, IFieldAttachmentsState
} from "../definitions";
import "../../sass/fieldAttachments.scss";

/**
 * Attachments field
 */
export class FieldAttachments extends React.Component<IFieldAttachmentsProps, IFieldAttachmentsState> implements IFieldAttachment {
    private _file: HTMLInputElement = null;

    /**
     * Constructor
     * @param props - The attachment field properties.
     */
    constructor(props: IFieldAttachmentsProps) {
        super(props);

        // Update the state
        this.state = {
            errorMessage: "",
            files: this.loadFiles(props.files),
            loadingFl: false
        };
    }

    /**
     * Method to render the component
     */
    render() {
        // See if the render method exists
        if (this.props.onRender) {
            return this.props.onRender(this.state.files);
        }

        // See if this is the display mode
        if (this.props.controlMode == SPTypes.ControlMode.Display) {
            // Render the attachments
            return (
                <div>
                    <div className={(this.props.className || "")}>{this.renderAttachments()}</div>
                    <input
                        type="file"
                        hidden={true}
                        onChange={this.addAttachment}
                        ref={file => { this._file = file; }}
                    />
                </div>
            );
        }

        // Render the attachments
        return (
            <div className={(this.props.className || "")}>
                {this.renderAttachments()}
                {
                    this.state.loadingFl ?
                        <Spinner
                            label="Uploading the file"
                        />
                        :
                        <Link className="ms-AttachmentLink" onClick={this.showFileDialog}>Add an attachment</Link>
                }
                {
                    this.state.errorMessage == "" ? null :
                        <span className="ms-fontSize-m ms-fontColor-redDark">{this.state.errorMessage}</span>
                }
                <input
                    type="file"
                    hidden={true}
                    onChange={this.addAttachment}
                    ref={file => { this._file = file; }}
                />
            </div>
        );
    }

    /**
     * Method to save the attachments to the item
     * @param itemId - The item id.
     */
    save = (itemId: number): PromiseLike<any> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Delete the attachments
            this.deleteAttachments().then(() => {
                // Save the attachments
                this.saveAttachments(itemId).then(() => {
                    // Resolve the promise
                    resolve();
                });
            });
        });
    }

    /**
     * Method to show the file dialog
     */
    showFileDialog = () => {
        // Show the file dialog
        this._file.click();
    }

    /**
     * Events
     */

    /**
     * Event triggered by the user selecting a file to upload
     * @param ev - The button click event.
     */
    private addAttachment = (ev) => {
        // Get the file information
        let srcFile = ev.target.files[0];
        if (srcFile) {
            let reader = new FileReader();

            // Update the state
            this.setState({
                errorMessage: "",
                loadingFl: true
            });

            // Set the file loaded event
            reader.onloadend = (ev: any) => {
                let newFl = true;
                let attachment: IAttachmentFile = null;
                let files = this.state.files;

                // Parse the attachments
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];

                    // See if the file already exists
                    if (file.name.toLowerCase() == srcFile.name.toLowerCase()) {
                        // Set the flag
                        newFl = false;

                        // Update the file
                        file.data = ev.target.result;
                        file.deleteFl = false;
                        file.name = srcFile.name;

                        // Set the attachment
                        attachment = file;

                        // Break from the loop
                        break;
                    }
                }

                // See if this is a new attachment
                if (newFl) {
                    attachment = {
                        data: ev.target.result,
                        deleteFl: false,
                        existsFl: false,
                        name: srcFile.name
                    };

                    // Add the file
                    files.push(attachment);
                }

                // Call the file added event
                this.props.onFileAdded ? this.props.onFileAdded(attachment) : null;

                // Update the state
                this.setState({
                    files,
                    loadingFl: false
                });
            }

            // Set the error
            reader.onerror = (ev: any) => {
                // Update the state
                this.setState({
                    errorMessage: ev.target.error,
                    loadingFl: false
                });
            }

            // Read the file
            reader.readAsArrayBuffer(srcFile);
        }
    }

    /**
     * The click event for the link.
     */
    private linkClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Execute the event
        if (this.props.onLinkClick) {
            // Get the file name
            let fileName = ev.currentTarget.getAttribute("data-fileName");

            // Parse the attachments
            let files = this.state.files;
            for (let i = 0; i < files.length; i++) {
                let file = files[i];

                // See if this is the attachment to remove
                if (file.name.toLowerCase() == fileName) {
                    // Execute the event
                    this.props.onLinkClick(file);

                    // Break from the loop
                    break;
                }
            }
        }
    }

    /**
     * Event triggered by clicking on the attachment delete icon
     * @param ev - The button click event.
     */
    private removeAttachment = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Get the file name
        let fileName = ev.currentTarget.getAttribute("data-fileName");

        // Parse the attachments
        let files = this.state.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            // See if this is the attachment to remove
            if (file.name.toLowerCase() == fileName) {
                // See if this item exists
                if (file.existsFl) {
                    // Set the delete flag
                    file.deleteFl = true;
                } else {
                    // Remove the file
                    files.splice(i, 1);
                }

                // Break from the loop
                break;
            }
        }

        // Update the state
        this.setState({ files });
    }

    /**
     * Methods
     */

    /**
     * Method to delete the attachments
     */
    private deleteAttachments = () => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the web
            let web = new Web(this.props.webUrl);

            // Parse the files
            for (let i = 0; i < this.state.files.length; i++) {
                let file = this.state.files[i];

                // See if we are deleting the file
                if (file.deleteFl) {
                    // Get the file
                    web.getFileByServerRelativeUrl(file.url)
                        // Delete the file
                        .delete()
                        // Execute the request
                        .execute(true);
                }
            }

            // Wait for the requests to complete
            web.done((...args) => {
                // Resolve the proimse
                resolve(args);
            })
        });
    }

    /**
     * Method to load the files
     * @param attachments - The file attachments.
     */
    private loadFiles = (attachments: Types.ComplexTypes.FieldAttachmentFiles) => {
        let files: Array<IAttachmentFile> = [];

        // Ensure attachments exist
        if (attachments && attachments.results) {
            // Parse the attachments
            for (let i = 0; i < attachments.results.length; i++) {
                let attachment = attachments.results[i];

                // Add the file
                files.push({
                    data: null,
                    deleteFl: false,
                    existsFl: true,
                    name: attachment.FileName,
                    url: attachment.ServerRelativeUrl
                });
            }
        }

        // Return the files
        return files;
    }

    /**
     * Method to render the attachments
     */
    private renderAttachments = () => {
        let files = [];

        // Parse the files
        for (let i = 0; i < this.state.files.length; i++) {
            let file = this.state.files[i];

            // Ensure we are not deleting this fiel
            if (file.deleteFl) { continue; }

            // Add the file
            files.push(
                <Link className="ms-AttachmentLink" key={file.name} href={file.url} data-fileName={file.name.toLowerCase()} download={true} onClick={this.linkClick}>
                    <span className="ms-fontSize-m">{file.name}</span>
                    {
                        this.props.controlMode == SPTypes.ControlMode.Display ? null :
                            <i className="ms-Icon ms-Icon--Delete" data-fileName={file.name.toLowerCase()} onClick={this.removeAttachment} />
                    }
                </Link>
            );
        }

        // Return the files
        return files;
    }

    /**
     * Method to save the attachments
     * @param itemId - The item id.
     */
    private saveAttachments = (itemId: number) => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the list item
            let item = (new Web(this.props.webUrl))
                // Get the list
                .Lists(this.props.listName)
                // Get the item
                .Items(itemId);

            // Parse the files
            for (let i = 0; i < this.state.files.length; i++) {
                let file = this.state.files[i];

                // See if we are deleting the file
                if (file.deleteFl) { continue; }

                // See if the binary data exists
                if (file.data) {
                    // Get the item attachments
                    item.AttachmentFiles()
                        // Add the item
                        .add(file.name, file.data)
                        // Execute the request, waiting for the previous one to complete
                        .execute(true);
                }
            }

            // Wait for the requests to complete
            item.done((...args) => {
                // Resolve the promise
                resolve(args);
            });
        });
    }
}