import * as React from "react";
import { Promise } from "es6-promise";
import { Types, Web } from "gd-sprest";
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
    /**
     * Constructor
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
     * Public Interface
     */

    // Method to render the component
    render() {
        return (
            <div>
                {this.renderAttachments()}
                {
                    this.state.loadingFl ?
                        <Spinner
                            label="Uploading the file"
                        />
                        :
                        <Link onClick={this.showFileDialog}>Add an attachment</Link>
                }
                {
                    this.state.errorMessage == "" ? null :
                        <span className="ms-fontSize-m ms-fontColor-redDark">{this.state.errorMessage}</span>
                }
                <input type="file" hidden={true} onChange={this.addAttachment} ref="file" />
            </div>
        );
    }

    // Method to save the attachments to the item
    save = (itemId:number): PromiseLike<any> => {
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
     * Events
     */

    // Event triggered by the user selecting a file to upload
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

                        // Break from the loop
                        break;
                    }
                }

                // See if this is a new attachment
                if (newFl) {
                    // Add the file
                    files.push({
                        data: ev.target.result,
                        deleteFl: false,
                        existsFl: false,
                        name: srcFile.name
                    });
                }

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

    // Event triggered by clicking on the attachment delete icon
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
            if(file.name.toLowerCase() == fileName) {
                // See if this item exists
                if(file.existsFl) {
                    // Set the delete flag
                    file.deleteFl = true;
                } else {
                    // Remove the file
                    files.splice(i, 1);
                }
            }
        }

        // Update the state
        this.setState({ files });
    }

    // Event triggered by clicking on the add attachment link
    private showFileDialog = (ev: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent postback
        ev.preventDefault();

        // Show the file dialog
        (this.refs["file"] as HTMLInputElement).click();
    }

    /**
     * Methods
     */

    // Method to delete the attachments
    private deleteAttachments = () => {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the web
            let web = new Web(this.props.webUrl);
            
            // Parse the files
            for (let i = 0; i < this.state.files.length; i++) {
                let file = this.state.files[i];
                
                // See if we are deleting the file
                if(file.deleteFl) {
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

    // Method to load the files
    private loadFiles = (attachments: Types.ComplexTypes.FieldAttachmentFiles) => {
        let files: Array<IAttachmentFile> = [];

        // Ensure attachments exist
        if(attachments && attachments.results) {
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

    // Method to render the attachments
    private renderAttachments = () => {
        let files = [];

        // Parse the files
        for (let i = 0; i < this.state.files.length; i++) {
            let file = this.state.files[i];

            // Ensure we are not deleting this fiel
            if(file.deleteFl) { continue; }

            // Add the file
            files.push(
                <Link className="ms-AttachmentLink" key={file.name} href={file.url} download={true}>
                    <span className="ms-fontSize-m">{file.name}</span>
                    <i className="ms-Icon ms-Icon--Delete" data-fileName={file.name.toLowerCase()} onClick={this.removeAttachment} />
                </Link>
            );
        }

        // Return the files
        return files;
    }

    // Method to save the attachments
    private saveAttachments = (itemId:number) => {
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
                if(file.deleteFl) { continue; }

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