import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonPageContentUserDevelopmentPlan
} from "../../../../stores/common/pageUserDevelopmentPlan/storeCommonPageContentUserDevelopmentPlan";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {AdminPopupEditor} from "../../../admin/adminPopupEditor";
import {DropdownSelect} from "../../dropdownSelect";
import {InputText} from "../../inputText";
import {EditableItemActionButtons} from "../../itemContainer";
import {LabelWithContainerOnOneLine} from "../../labelWithContainerOnOneLine";
import {LabelWithContainerOnTwoLine} from "../../labelWithContainerOnTwoLine";
import {StandardButton} from "../../standardButton";
import styles from './userDevelopmentPlanEditorStyle.scss';

const InputEditorText = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <InputText
            className={styles.inputText}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    );
});

const DropdownSelectEditorValueNumber = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
    return (
        <>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                isClearable={false}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
            />
            {props.store.errorText ? <div className={styles.errorText}>{props.store.errorText}</div> : null}
        </>
    );
});

const DropdownSelectEditorValueString = observer((props: SmartComponentProps<StoreComponentDropdownSelect<number,string>>) => {
    return (
        <>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                isClearable={true}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
            />
            {props.store.errorText ? <div className={styles.errorText}>{props.store.errorText}</div> : null}
        </>
    );
});


interface CategoryContainerProps {
    readonly categoryTitle: string;
    readonly children: React.ReactNode;
    readonly gridContainer?: boolean;
}

const CategoryContainer = React.memo((props: CategoryContainerProps) => {
    return (
        <div>
            <div className={styles.categorySeparator}>
                {props.categoryTitle}
            </div>
            <div className={props.gridContainer ? styles.gridContentContainer : styles.categoryContentContainer}>
                {props.children}
            </div>
        </div>
    );
});


function UserDevelopmentPlanEditor(props: SmartComponentProps<StoreCommonPageContentUserDevelopmentPlan>) {
    if (!props.store.storeEditData) {
        return null;
    }
    if (props.store.storeEditData?.storeIsActive.status === true) { return null }
    else {
        return (
            <AdminPopupEditor
                className={styles.popupBodySize}
                eventCloseEditor={props.store.storeEditData.eventCloseEditor}
                eventSaveEditData={props.store.storeEditData.eventSaveEditData}
                popupTitle={props.store.storeEditData.textEditorTitle}
                btnSaveText={props.store.storeEditData.textSaveBtn}
            >
                <LabelWithContainerOnTwoLine
                    label={'Направление плана развития:'}
                >
                    <InputEditorText store={props.store.storeEditData.storeEditCareerTarget} />
                </LabelWithContainerOnTwoLine>
                <LabelWithContainerOnTwoLine
                    label={'Год :'}
                >
                    <DropdownSelectEditorValueNumber store={props.store.storeEditData.storeEditYears} />
                </LabelWithContainerOnTwoLine>
                <LabelWithContainerOnTwoLine
                    label={'Список курсов локальной академии:'}
                >
                    <DropdownSelectEditorValueString store={props.store.storeEditData.storeEditCourses} />
                </LabelWithContainerOnTwoLine>
                {props.store.storeEditData.storeEditCourses.selectedValue ?
                    <LabelWithContainerOnTwoLine
                        label={"Комментарий:"}
                    >
                        <InputEditorText store={props.store.storeEditData.storeEditCourseComment} />
                    </LabelWithContainerOnTwoLine> : null}
                <div className={styles.containerBtn}>
                    <StandardButton
                        text={'Добавить в план'}
                        type={props.store.storeEditData.storeEditCourses.selectedValue ? 'primary' : 'disabled'}
                        eventClick={props.store.storeEditData.eventAddSelectCourse}
                    />
                    <StandardButton
                        text={'Добавить направление развития'}
                        type={'primary'}
                        eventClick={props.store.storeEditData?.eventStartAddCourses}
                    />
                </div>
                {props.store.storeEditData.coursesLocalList.length ?
                    <div className={styles.courses}>
                        <CategoryContainer categoryTitle={'Курсы локальной академии'}>
                            <div className={styles.coursesContainer}>
                                {
                                    props.store.storeEditData.coursesLocalList.map((item) => {
                                        return (

                                            <div className={styles.coursesItem} key={item.uuid}>
                                                <LabelWithContainerOnOneLine
                                                    label={'Способ:'}
                                                >
                                                    {item.method}
                                                </LabelWithContainerOnOneLine>
                                                <LabelWithContainerOnOneLine
                                                    label={'Наименование:'}
                                                >
                                                    {item.name}
                                                </LabelWithContainerOnOneLine>

                                                <LabelWithContainerOnOneLine
                                                    label={'Комментарий:'}
                                                >
                                                    {item.comment}
                                                </LabelWithContainerOnOneLine>
                                                <EditableItemActionButtons
                                                    itemUuid={item.uuid}
                                                    eventStartEdit={props.store.storeEditData?.eventStartEdditCoursesLocalComment}
                                                    eventDeleteItem={props.store.storeEditData?.eventStartDeleteCoursesLocal}
                                                    className={styles.coursesBtns}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </CategoryContainer> 
                    </div>: null
                }
                {props.store.storeEditData.coursesExternalList.length ?
                    <div className={styles.courses}>
                        <CategoryContainer categoryTitle={'Другие направления развития'}>
                            <div className={styles.coursesContainer}>
                                {
                                    props.store.storeEditData.coursesExternalList.map((item) => {
                                        return (

                                            <div className={styles.coursesItem} key={item.uuid}>
                                                <LabelWithContainerOnOneLine
                                                    label={'Способ:'}
                                                >
                                                    {item.method}
                                                </LabelWithContainerOnOneLine>
                                                <LabelWithContainerOnOneLine
                                                    label={'Наименование:'}
                                                >
                                                    {item.name}
                                                </LabelWithContainerOnOneLine>

                                                <LabelWithContainerOnOneLine
                                                    label={'Комментарий:'}
                                                >
                                                    {item.comment}
                                                </LabelWithContainerOnOneLine>
                                                <EditableItemActionButtons
                                                    itemUuid={item.uuid}
                                                    eventStartEdit={props.store.storeEditData?.eventStartEdditCourses}
                                                    eventDeleteItem={props.store.storeEditData?.eventStartDeleteCoursesExternal}
                                                    className={styles.coursesBtns}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </CategoryContainer> 
                    </div>: null
                }
            </AdminPopupEditor>
        );
    }
}

export default observer(UserDevelopmentPlanEditor);
