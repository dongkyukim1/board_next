import { connectDB } from "../../utils/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
    // params 객체를 await로 비동기 처리
    const params = await props.params;
    const 글번호 = params.글번호;
    
    const db = (await connectDB).db("board_next");
    const result = await db.collection("next").findOne({
        _id: new ObjectId(글번호)            
    });

    return <div>
        <h4>상세페이지</h4>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
    </div>
}

// 이 파일은 글 번호를 받아와서 그 글 번호에 해당하는 글의 내용을 보여주는 페이지입니다.
// 글 번호는 URL에서 동적으로 전달되며, 이 파일은 해당 글 번호에 대한 상세 정보를 표시합니다.
// 예를 들어, /detail/1 에 접속하면 1번 글의 상세 내용을 보여줍니다.
// 이 파일은 글 번호를 받아와서 그 글 번호에 해당하는 글의 내용을 보여주는 페이지입니다.
// 글 번호는 URL에서 동적으로 전달되며, 이 파일은 해당 글 번호에 대한 상세 정보를 표시합니다.
//글 제목으로 .findone 하면 중복이 있기 때문에 id 로 하는게 좀 좋다.
//   _id: new ObjectId("67decabb311888c475d79764") 이거  하드 코딩말고 하는게좋다 -> 유저가 입력한값 
