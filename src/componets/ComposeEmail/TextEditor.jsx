import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types"; 

const TextEditor = ({ body, setBody }) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ["clean"], 
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "blockquote",
        "code-block",
        "link",
        "image",
        "video",
        "align",
        "color",
        "background",
    ];

    return (
        <div className=" min-h-[290px] rounded-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 mx-auto">
            <ReactQuill
                value={body}
                onChange={setBody}
                modules={modules}
                formats={formats}
                theme="snow"
                className="h-56"
            />
        </div>
    );
};

TextEditor.propTypes = {
    body: PropTypes.string.isRequired, 
    setBody: PropTypes.func.isRequired, 
};

TextEditor.defaultProps = {
    body: "",
};

export default TextEditor;
