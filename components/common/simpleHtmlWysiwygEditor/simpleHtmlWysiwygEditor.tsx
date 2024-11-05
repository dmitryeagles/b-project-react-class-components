import React from 'react';
import {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnNumberedList,
    BtnRedo,
    BtnUnderline,
    BtnUndo,
    ContentEditableEvent,
    Editor,
    EditorProvider,
    HtmlButton,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg';
import styles from './simpleHtmlWysiwygEditorStyle.scss';

interface SimpleHtmlWysiwygEditorProps {
    eventChangeValue?: (e: ContentEditableEvent) => void;
    valueHtml?: string;
    errorText?: string;
}

function SimpleHtmlWysiwygEditor(props: SimpleHtmlWysiwygEditorProps) {
    return (
        <div>
            <div className={props.errorText ? styles.editorContainerError : styles.editorContainer}>
                <EditorProvider>
                    <Editor
                        onChange={props.eventChangeValue}
                        value={props.valueHtml}
                    >
                        <Toolbar>
                            <BtnUndo title={'Отменить'}/>
                            <BtnRedo title={'Вернуть'}/>
                            <Separator/>
                            <BtnBold title={'Жирный'}/>
                            <BtnItalic title={'Курсив'}/>
                            <BtnUnderline title={'Подчеркнутый'}/>
                            <Separator/>
                            <BtnNumberedList title={'Числовой список'}/>
                            <BtnBulletList title={'Маркированный список'}/>
                            <Separator/>
                            <HtmlButton/>
                            <BtnClearFormatting title={'Очистить форматирование'}/>
                        </Toolbar>
                    </Editor>
                </EditorProvider>
            </div>
            {
                props.errorText ?
                <div className={styles.errorText}>
                    {props.errorText}
                </div>: null
            }
        </div>
    );
}

export default SimpleHtmlWysiwygEditor;
