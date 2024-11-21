import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from 'styled-components';
import { jelloVertical } from '../components/Animation.tsx';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';
import { ImageDrop } from "quill-image-drop-module";
import katex from 'katex';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import axios from 'axios';
import { errorMessage, successMessage } from '../utils/SweetAlertEvent.tsx';
import { authCheck } from '../utils/authCheck.tsx';
import 'katex/dist/katex.min.css'; // formular 활성화
import 'react-quill/dist/quill.snow.css'; // Quill snow스타일 시트 불러오기
import '../scss/QuillEditor.scss';

const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_PORT;

declare global {
    interface Window {
        katex: typeof katex;
    }
}
window.katex = katex;

// 모듈 등록
Quill.register("modules/imageDrop", ImageDrop);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
Quill.register('modules/ImageResize', ImageResize);

// 폰트 사이즈 추가
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["8px", "10px", "12px",
    "14px", "20px", "24px", "30px", "36px", "48px",
    "60px", "72px", "84px", "96px", "120px"];
Quill.register(Size, true);

// 폰트 추가
const Font = Quill.import("attributors/class/font");
Font.whitelist = ["arial", "buri", "gangwon", "Quill", "serif", "monospace", "끄트머리체", "할아버지의나눔", "나눔고딕", "궁서체", "굴림체", "바탕체", "돋움체"];
Quill.register(Font, true);

// align & icon 변경
const Align = ReactQuill.Quill.import("formats/align");
Align.whitelist = ["left", "center", "right", "justify"];
const Icons = ReactQuill.Quill.import("ui/icons");
Icons.align["left"] = Icons.align[""];

const formats = [
    "header", "font", "size", "bold", "italic", "underline", "align", "strike", "script", "blockquote", "background", "list", "bullet", "indent",
    "link", "image", "video", "color", "code-block", "formula", "direction"
];

const CategoryList = ['React', 'Node', 'Backend', 'Game', 'Etc'];

const QuillEditor: React.FC = () => {
    const [editorHtml, setEditorHtml] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>(CategoryList[0]);
    const [imgData, setImgData] = useState<string[]>([]); // 이미지 배열
    const quillRef = useRef<ReactQuill | null>(null); // Ref 타입 설정
    const navigate = useNavigate();

    // 이미지 처리를 하는 핸들러
    const imageHandler = () => {
        // 1. 이미지를 저장할 input type=file DOM을 만든다.
        const input = document.createElement('input');
        // 속성 써주기
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*'); // 원래 image/*
        input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.

        input.addEventListener('change', async () => {
            const file = input.files?.[0];
            if (!file) return; // 파일이 선택되지 않은 경우

            const formData = new FormData();
            formData.append('img', file); // formData는 키-밸류 구조
            try {
                const result = await axios.post(`${HOST}:${PORT}/img`, formData);
                console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
                setImgData(prevFiles => [...prevFiles, result.data.realName]);
                const IMG_URL = result.data.url;
                // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
                const editor = quillRef.current?.getEditor(); // 에디터 객체 가져오기
                if (!editor) return; // editor가 없으면 함수 종료
                // 현재 에디터 커서 위치값을 가져온다
                const range = editor.getSelection();
                if (range) { // range가 null이 아닌 경우에만 이미지 삽입
                    editor.insertEmbed(range.index, 'image', IMG_URL);
                }
            } catch (error) { console.log('이미지 불러오기 실패'); }
        }, { once: true });
    };
    //dnd 처리 핸들러
    const imageDropHandler = useCallback(async (dataUrl) => {
        try {
            // dataUrl을 이용하여 blob 객체를 생성
            const blob = await fetch(dataUrl).then(res => res.blob());
            // FormData 객체를 생성하고 'img' 필드에 blob을 추가
            const formData = new FormData();
            formData.append('img', blob);
            // FormData를 서버로 POST 요청을 보내 이미지 업로드를 처리
            const result = await axios.post(`${HOST}:${PORT}/img`, formData);
            console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
            setImgData(prevFiles => [...prevFiles, result.data.realName]);

            // 서버에서 반환된 이미지 URL을 변수에 저장
            const IMG_URL = result.data.url;
            // Quill 에디터 인스턴스를 호출
            const editor = quillRef.current?.getEditor(); // 에디터 객체 가져오기
            if (!editor) return; // editor가 없으면 함수 종료
            // 현재 에디터 커서 위치값을 가져온다
            const range = editor.getSelection();
            if (range) { // range가 null이 아닌 경우에만 이미지 삽입
                editor.insertEmbed(range.index, 'image', IMG_URL);
            }
        } catch (error) { console.log('이미지 업로드 실패', error); }
    }, []);

    // 에디터 내용 변경 핸들러
    const handleChange = useCallback((html: string) => {
        setEditorHtml(html);
    }, []);

    const modules = useMemo(() => ({
        toolbar: {
            container: "#toolbar",
            handlers: {
                "undo": undoChange,
                "redo": redoChange,
                "image": imageHandler,
                insertHeart: insertHeart,
            },
        },
        // undo, redo history
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true
        },
        // image resize 추가
        ImageResize: { parchment: Quill.import('parchment') },
        imageDropAndPaste: { handler: imageDropHandler },
    }), [imageDropHandler]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (authCheck() === 0) {
            errorMessage("잘못된 접근!");
            return;
        }
        const description = quillRef.current?.getEditor().getText(); //태그를 제외한 순수 text만을 받아온다. 검색기능을 구현하지 않을 거라면 굳이 text만 따로 저장할 필요는 없다.
        // description.trim()
        axios.post(`${HOST}:${PORT}/diary/write`, {
            title: title,
            content: description,
            realContent: editorHtml,
            category: selectedCategory,
            imgData: imgData
        }).then((res) => {
            successMessage("저장되었습니다!");
            navigate("/diary");
        }).catch((e) => { errorMessage("에러!!"); });
    };

    const handleCancel = async () => {
        if (imgData.length > 0) {
            axios.delete(`${HOST}:${PORT}/delete_files`, {
                params: {
                    imgData: imgData
                }
            }).then((response) => { }).catch((error) => { errorMessage("에러!!"); });
        }
        navigate('/diary');
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };
    return (
        <FormContainer onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" className="quill-title" onChange={(e) => setTitle(e.target.value)} required />
            <SelectContainer>
                <label htmlFor="category">카테고리 선택: </label>
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                    {CategoryList.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </SelectContainer>
            <div id="toolbar">
                <span className="ql-formats">
                    <select className="ql-font" defaultValue="arial" title="서체 변경">
                        <option value="arial">Arial</option>
                        <option value="나눔고딕">나눔고딕</option>
                        <option value="궁서체">궁서체</option>
                        <option value="굴림체">굴림체</option>
                        <option value="바탕체">바탕체</option>
                        <option value="바탕체">돋움체</option>
                        <option value="serif">serif</option>
                        <option value="monospace">monospace</option>
                        <option value="Quill">Quill</option>
                        <option value="buri">부리</option>
                        <option value="gangwon">강원</option>
                        <option value="끄트머리체">끄트머리체</option>
                        <option value="할아버지의나눔">할아버지의나눔</option>
                    </select>
                    <select className="ql-size" defaultValue="medium" title="글자 크기 변경">
                        <option value="8px">8px</option>
                        <option value="10px">10px</option>
                        <option value="12px">12px</option>
                        <option value="14px">14px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                        <option value="30px">30px</option>
                        <option value="36px">36px</option>
                        <option value="48px">48px</option>
                        <option value="60px">60px</option>
                        <option value="72px">72px</option>
                        <option value="84px">84px</option>
                        <option value="96px">96px</option>
                        <option value="120px">120px</option>
                    </select>
                    <select className="ql-header" defaultValue="3" title="문단 서식 변경">
                        <option value="1">h1</option>
                        <option value="2">h2</option>
                        <option value="3">h3</option>
                        <option value="4">h4</option>
                        <option value="5">h5</option>
                        <option value="6">h6</option>
                    </select>
                </span>
                <span className="ql-formats">
                    <button className="ql-bold" title="굵기" />
                    <button className="ql-italic" title="기울이기" />
                    <button className="ql-underline" title="밑줄" />
                    <button className="ql-strike" title="취소선" />
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="ordered" title="숫자 목록" />
                    <button className="ql-list" value="bullet" title="기호 목록" />
                    <button className="ql-indent" value="-1" title="왼쪽 이동" />
                    <button className="ql-indent" value="+1" title="오른쪽 이동" />
                </span>
                <span className="ql-formats">
                    <button className="ql-script" value="super" title="위 첨자" />
                    <button className="ql-script" value="sub" title="아래 첨자" />
                    <button className="ql-blockquote" title="단락 들여쓰기" />
                    <button className="ql-direction" value="rtl" title="한 번에 정렬" />
                </span>
                <span className="ql-formats">
                    <select className="ql-align" defaultValue="justify" title="정렬" />
                    <select className="ql-color" title="글자색 변경" />
                    <select className="ql-background" title="배경색 변경" />
                </span>
                <span className="ql-formats">
                    <button className="ql-link" title="링크 삽입" />
                    <button className="ql-image" title="사진 추가" />
                    <button className="ql-video" title="비디오 추가" />
                </span>
                <span className="ql-formats">
                    <button className="ql-formula" title="수식 추가" />
                    <button className="ql-code-block" title="문장 블록" />
                    <button className="ql-clean" title="초기화" />
                </span>
                <span className="ql-formats">
                    <button className="ql-undo" title="뒤로 되돌리기">
                        <CustomUndo />
                    </button>
                    <button className="ql-redo" title="앞으로 복구하기">
                        <CustomRedo />
                    </button>
                    <button className="ql-insertHeart" title="heart">
                        <CustomHeart />
                    </button>
                </span>
            </div>
            <ReactQuill
                theme="snow"// 테마 설정 (여기서는 snow를 사용)
                value={editorHtml}
                onChange={handleChange}
                ref={quillRef}
                modules={modules}
                formats={formats}
            />
            <ButtonContainer>
                <button>저장하기</button>
                <button onClick={handleCancel}>취소하기</button>
            </ButtonContainer>
        </FormContainer>
    )
}

// handle them correctly
const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
            className="ql-stroke"
            d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
    </svg>
);
// Redo button icon component for Quill editor
const CustomRedo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
        <path
            className="ql-stroke"
            d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
        />
    </svg>
);

const CustomHeart = () => <span>♥</span>;

function insertHeart() {
    const cursorPosition = this.quill.getSelection().index;
    this.quill.insertText(cursorPosition, "♥");
    this.quill.setSelection(cursorPosition + 1);
}

// Undo and redo functions for Custom Toolbar
function undoChange() {
    this.quill.history.undo();
}
function redoChange() {
    this.quill.history.redo();
}

const FormContainer = styled.form`
    background-color:rgba(214, 230, 245, 0.925);
`;

const SelectContainer = styled.div`
    margin: 20px 0;
    display: flex;
    align-items: center;

    label {
        margin-right: 10px;
        font-weight: bold;
    }

    select {
        padding: 5px 10px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
`;

const ButtonContainer = styled.div`
    display: flex; // Flexbox 사용
    justify-content: center;

    button {
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #282c34;
        border: none;
        border-radius: 20px; // 둥근 모서리
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 가벼운 그림자

        &:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25); // 그림자 강조
            animation: ${jelloVertical} 1s ease forwards;
        }

        &:active {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
            transform: translateY(1px); // 눌렀을 때 약간 내려가는 효과
        }
    }
`;

export default QuillEditor;