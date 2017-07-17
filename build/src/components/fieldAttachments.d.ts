/// <reference types="react" />
import * as React from "react";
import { IFieldAttachment, IFieldAttachmentsProps, IFieldAttachmentsState } from "../definitions";
import "../../sass/fieldAttachments.scss";
/**
 * Attachments field
 */
export declare class FieldAttachments extends React.Component<IFieldAttachmentsProps, IFieldAttachmentsState> implements IFieldAttachment {
    /**
     * Constructor
     */
    constructor(props: IFieldAttachmentsProps);
    /**
     * Public Interface
     */
    render(): JSX.Element;
    save: (itemId: number) => PromiseLike<any>;
    /**
     * Events
     */
    private addAttachment;
    private removeAttachment;
    private showFileDialog;
    /**
     * Methods
     */
    private deleteAttachments;
    private loadFiles;
    private renderAttachments;
    private saveAttachments;
}
