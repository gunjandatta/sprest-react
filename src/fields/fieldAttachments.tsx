import * as React from "react";
import { Helper, SPTypes, Web } from "gd-sprest";
import { Attachment } from "gd-sprest-def/lib/SP";
import { Link } from "office-ui-fabric-react/lib/Link";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import {
    IAttachmentFile,
    IFieldAttachment, IFieldAttachmentsProps, IFieldAttachmentsState
} from "./types";
import "../../sass/fieldAttachments.css";

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
            files: {
                Delete: [],
                Existing: props.files && typeof (props.files) != "function" ? props.files : null,
                New: []
            },
            listInfo: null,
            loadingFl: false
        };
    }

    // Render the component
    render() {
        let elAttachments = null;
        let loadingFl = this.state.loadingFl;

        // Ensure the attachments have been loaded
        if (this.state.files.Existing == null) {
            // Load the attachments
            this.loadAttachments();

            // Set the flag
            loadingFl = true;
        }

        // See if we are loading the attachments
        if (loadingFl) {
            // Render a loading dialog
            return (
                <Spinner label="Loading..." />
            );
        }

        // See if the render method exists
        if (this.props.onRender) {
            elAttachments = this.props.onRender(this.state.files.Existing);
        } else {
            // See if this is the display mode
            if (this.props.controlMode == SPTypes.ControlMode.Display) {
                // Render the attachments in display mode
                elAttachments = (
                    <div className={(this.props.className || "")}>{this.renderAttachments()}</div>
                );
            } else {
                // Render the attachments in edit mode
                elAttachments = (
                    <div className={(this.props.className || "")}>
                        {this.renderAttachments()}
                        <Link className="ms-AttachmentLink" onClick={this.showFileDialog}>Add an attachment</Link>
                        {
                            this.state.errorMessage == "" ? null :
                                <span className="ms-fontSize-m ms-fontColor-redDark">{this.state.errorMessage}</span>
                        }
                    </div>
                );
            }

            // Call the render event
            elAttachments = this.props.onAttachmentsRender ? this.props.onAttachmentsRender(elAttachments) : elAttachments;
        }

        // Render the attachments
        return (
            <div>
                {elAttachments}
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
     * Methods
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
                let state = this.state;

                // Parse the attachments
                for (let i = 0; i < this.state.files.Existing.length; i++) {
                    let file = this.state.files.Existing[i];

                    // See if the file already exists
                    if (file.name.toLowerCase() == srcFile.name.toLowerCase()) {
                        let deleteFl = true;

                        // Set the flag
                        newFl = false;

                        // Delete the file
                        for (let j = 0; j < this.state.files.Delete.length; j++) {
                            // See if this file is already flagged to be deleted
                            if (this.state.files.Delete[j].name == file.name) {
                                // Set the flag
                                deleteFl = false;
                            }
                        }

                        // See if we are deleting the file
                        if (deleteFl) {
                            // Delete the file
                            this.state.files.Delete.push(file);
                        } else {
                            // Parse the files to add
                            for (let j = 0; j < this.state.files.New.length; j++) {
                                let newFile = this.state.files.New[j];

                                // See if this is the file
                                if (newFile.name == file.name) {
                                    // Update the file
                                    newFile.data = ev.target.result;
                                    newFile.name = srcFile.name;
                                }
                            }
                        }

                        // Break from the loop
                        break;
                    }
                }

                // See if this is a new attachment
                if (newFl) {
                    let ext = srcFile.name.split(".") as any;
                    ext = ext[ext.length - 1].toLowerCase();

                    // Add the attachment
                    state.files.New.push({
                        data: ev.target.result,
                        ext,
                        name: srcFile.name
                    });
                }

                // Call the file added event
                this.props.onFileAdded ? this.props.onFileAdded(attachment) : null;

                // Update the state
                this.setState(state);
            }

            // Set the error
            reader.onerror = (ev: any) => {
                // Update the state
                this.setState({
                    errorMessage: ev.target.error
                });
            }

            // Read the file
            reader.readAsArrayBuffer(srcFile);
        }
    }

    /**
     * Method to delete the attachments
     */
    private deleteAttachments = (state: IFieldAttachmentsState): PromiseLike<IFieldAttachmentsState> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            let files: Array<Attachment> = [];

            // Parse the files to delete
            for (let i = 0; i < this.state.files.Delete.length; i++) {
                let file = this.state.files.Delete[i];

                // add the file
                files.push({
                    FileName: file.name,
                    ServerRelativeUrl: file.url
                } as any);
            }

            // Ensure files exist
            if (files.length > 0) {
                // Remove the attachments
                this.removeAttachments({
                    itemId: this.props.itemId,
                    listName: this.props.listName,
                    webUrl: this.props.webUrl
                }, files).then(() => {
                    // Clear the delete array
                    state.files.Delete = [];

                    // Resolve the promise
                    resolve(state);
                });
            } else {
                // Resolve the promise
                resolve(state);
            }
        });
    }

    /**
     * Method to load the attachment files from the item.
     */
    private loadAttachments = () => {
        // Create the list information
        Helper.ListForm.create({
            itemId: this.props.itemId,
            listName: this.props.listName,
            loadAttachments: true,
            webUrl: this.props.webUrl
        }).then(listInfo => {
            // Update the state
            this.setState({
                files: {
                    Delete: [],
                    Existing: this.toArray(listInfo.attachments),
                    New: []
                },
                listInfo
            });
        });
    }

    /**
     * The click event for the link.
     */
    private linkClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Execute the event
        if (this.props.onFileClick) {
            // Get the file name
            let fileName = ev.currentTarget.getAttribute("data-filename");

            // Parse the attachments
            for (let i = 0; i < this.state.files.Existing.length; i++) {
                let file = this.state.files.Existing[i];

                // See if this is the attachment to remove
                if (file.name.toLowerCase() == fileName) {
                    // Execute the event
                    this.props.onFileClick(file);

                    // Break from the loop
                    break;
                }
            }
        }
    }

    // Refresh the attachments
    refresh = (): PromiseLike<void> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Clear the existing items
            let state = this.state;
            state.files.Existing = null;

            // Update the state
            this.setState(state, () => {
                // Resolve the promise
                resolve();
            });
        });
    }

    /**
     * Event triggered by clicking on the attachment delete icon
     * @param ev - The button click event.
     */
    private removeAttachment = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Get the file name
        let fileName = ev.currentTarget.getAttribute("data-filename").toLowerCase();

        // Parse the attachments
        for (let i = 0; i < this.state.files.Existing.length; i++) {
            let file = this.state.files.Existing[i];

            // See if this is the attachment to remove
            if (file.name.toLowerCase() == fileName) {
                let files = this.state.files;

                // Delete the attachment
                files.Delete.push(file);

                // Update the state
                this.setState({ files });

                // Break from the loop
                break;
            }
        }
    }

    /**
     * Method to remove the attachments.
     */
    private removeAttachments = (info: Helper.IListFormProps, attachments: Array<Attachment>): PromiseLike<void> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            let web = Web(info.webUrl);

            // Parse the attachments
            for (let i = 0; i < attachments.length; i++) {
                let attachment = attachments[i];

                // Get the file
                web.getFileByServerRelativeUrl(attachment.ServerRelativeUrl)
                    // Delete the file
                    .delete()
                    // Execute the request
                    .execute(true);
            }

            // Wait for the requests to complete
            web.done(() => {
                // Resolve the request
                resolve();
            });
        });
    }

    /**
     * Method to render the attachments
     */
    private renderAttachments = () => {
        let attachments = [];

        // Parse the files
        for (let i = 0; i < this.state.files.Existing.length; i++) {
            let file = this.state.files.Existing[i];

            // See if the file render event exists
            let attachment = null;
            if (this.props.onFileRender) {
                // Set the attachment
                attachment = this.props.onFileRender(file);
                if (attachment) {
                    // Add the attachment
                    attachments.push(attachment);
                }
            } else {
                // Add the attachment
                attachments.push(
                    <Link className="ms-AttachmentLink" key={file.name} href={file.url} data-filename={file.name.toLowerCase()} download={true} onClick={this.linkClick}>
                        <span className="ms-fontSize-m">{file.name}</span>
                        {
                            this.props.controlMode == SPTypes.ControlMode.Display ? null :
                                <i className="ms-Icon ms-Icon--Delete" data-filename={file.name.toLowerCase()} onClick={this.removeAttachment} />
                        }
                    </Link>
                );
            }
        }

        // Return the attachments
        return attachments;
    }

    /**
     * Method to save the attachments to the item
     */
    save = (): PromiseLike<void> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Update the state
            this.setState({ loadingFl: true }, () => {
                // Delete the attachments
                this.deleteAttachments(this.state).then(state => {
                    // Save the attachments
                    this.saveAttachments(state).then(state => {
                        // Set the loading flag
                        state.loadingFl = false;

                        // Update the state
                        this.setState(state, () => {
                            // Resolve the promise
                            resolve();
                        });
                    });
                });
            });
        });
    }

    /**
     * Method to save the attachments
     */
    private saveAttachments = (state: IFieldAttachmentsState): PromiseLike<IFieldAttachmentsState> => {
        // Return a promise
        return new Promise((resolve, reject) => {
            let files: Array<Helper.IListFormAttachmentInfo> = [];

            // Parse the new files
            for (let i = 0; i < state.files.New.length; i++) {
                let file = state.files.New[i];

                // See if data exists
                if (file.data) {
                    // add the file
                    files.push({
                        data: file.data,
                        name: file.name
                    });
                }
            }

            // Clear the new items
            state.files.New = [];

            // Ensure files exist
            if (files.length > 0) {
                // Save the attachments
                Helper.ListForm.saveAttachments({
                    itemId: this.props.itemId,
                    listName: this.props.listName,
                    webUrl: this.props.webUrl
                }, files).then(attachments => {
                    // Update the attachments
                    state.listInfo.attachments = attachments;

                    // Resolve the promise
                    resolve(state);
                });
            } else {
                // Resolve the promise
                resolve(state);
            }
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
     * Method to convert the item value to the attachment file array
     * @param attachments - The file attachments.
     */
    private toArray = (attachments: Array<Attachment>) => {
        let files: Array<IAttachmentFile> = [];

        // Ensure attachments exist
        if (attachments) {
            // Parse the attachments
            for (let i = 0; i < attachments.length; i++) {
                let attachment = attachments[i];

                // Set the file extension
                let ext: any = attachment.FileName.split(".");
                ext = ext[ext.length - 1].toLowerCase();

                // Add the file
                files.push({
                    data: null,
                    ext,
                    name: attachment.FileName,
                    url: attachment.ServerRelativeUrl
                });
            }
        }

        // Return the files
        return files;
    }
}