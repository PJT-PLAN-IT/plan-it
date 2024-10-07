import { Editor } from "@tinymce/tinymce-react";

const TripScroll = () => {
  return (
    <div className="flex justify-start">
      <select className="border rounded-[9px] text-xs outline-none w-60 h-10 p-2 my-10  ">
        <option className="">내가 가고싶은 여행1 </option>
        <option className="">내가 가고싶은 여행2 </option>
        <option className="">내가 가고싶은 여행3</option>
      </select>
    </div>
  );
};

function Textbox({ formData, titleChange, contentChange }) {
  return (
    <div className=" flex-col border border-gray-400  mb-[70px] ">
      <input
        onChange={titleChange}
        name="title"
        className=" w-[400px] h-10 p-2 my-2 justify-start block focus:outline-none"
        type="text"
        placeholder="제목을 입력하세요"
        maxLength={14}
      />

      <Editor
        apiKey="xrrohkv0t2zqx94m985ll5nay89i4r3tppwr17zjeg2igtg6"
        onEditorChange={contentChange}
        value={formData}
        init={{
          forced_root_block: "",
          force_br_newlines: true,
          force_p_newlines: false,
          plugins: [
            // Core editing features
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "visualblocks",
          ],
          height: 600,
          elementpath: false,
          toolbar:
            "blocks fontfamily fontsize | bold italic underline strikethrough | link table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | ",
          tinycomments_mode: "embedded",
          menubar: "",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        initialValue=""
      />
    </div>
  );
}

export default Textbox;

export { TripScroll };
