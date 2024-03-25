import react, { useEffect, useState } from "react";
import { useCustomToast } from "../components/hooks/useCustomToast";
import axios from "axios";
import AuthCode from "react-auth-code-input";
import "./style.css";
import Timer from "../components/hooks/Timer";

async function signUpUser(credentials) {
  return fetch("/api/v1/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function smsSend(data) {
  const response = await axios.post("/api/v1/auth/sms", data);
  return response;
}

const smsCheck = async (data) => {
  const response = await axios.post("api/v1/auth/sms/check", data);
  return response;
};

async function checkSumEmail(email) {
  if (!email) return null;
  const response = await fetch(`/api/v1/users/check/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

const Terms = `Cloud PC 이용약관

제1장 총칙

제1조 (목적)
본 약관은 (주)그린비티 코리아(이하 회사)가 제공하는 스트리밍 서비스(이하 서비스)의 이용과 관련하여 회사와 회원의 권리, 의무 및 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (용어의 정의)
본 약관에서 사용하는 주요한 용어의 정의는 다음과 같습니다.
①회원 : 회사와 서비스 이용 계약을 체결하고 회원 아이디(ID)를 부여받은 자를 말합니다.
②아이디 : 회원의 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 회사가 승인하는 문자나 숫자 혹은 그 조합을 말합니다. (이하 ID)
③비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고, 회원 자신의 비밀을 보호하기 위하여 회원이 정한 문자와 숫자의 조합을 말합니다.
④이용 제한 : 회사가 약관에 따라 회원의 서비스 이용을 제한하는 것을 말하며, 일정 기간 서비스 이용 중지, 영구적인 서비스 이용 중지, 서비스 중 일부에 대한 이용 중지를 포함합니다.
⑤포인트 : 요금 결제 시, 각 회원에게 부여되는 점수로 현금 결제 또는 서비스 내에서의 활동 정도 및 서비스의 이용에 따라 증감 또는 감소하는 수치를 말합니다.

제3조 (약관의 효력 및 변경)
①본 약관의 내용은 회원이 쉽게 알 수 있도록 서비스 화면에 게시하거나 기타의 방법으로 공지하고, 본 약관에 동의한 모두에게 그 효력이 발생합니다.
②회사는 필요하다고 인정되는 경우 본 약관을 변경할 수 있으며, 회사가 약관을 변경할 경우에는 적용일 및 변경 내용을 명시하여 제1항의 방법으로 그 적용일의 최소 7일 전부터 공지합니다. 다만, 회원에게 불리한 약관의 변경인 경우에는 최소 30일 전부터 공지합니다. 회사는 회원에게 불리한 약관 변경의 경우 회원 정보에 기재된 이메일로 개별 통지합니다.
③회사가 제2항에 따라 약관의 변경을 공지 또는 통지하면서 변경 약관의 적용일까지 거부 의사를 표시하지 않으면 약관 변경에 동의한 것으로 간주한다는 내용을 공지 또는 통지하였음에도 불구하고 회원이 명시적으로 거부 의사를 표시하지 않은 경우 변경 약관에 동의한 것으로 봅니다. 회원은 변경된 약관에 동의하지 않는 경우 이용 계약을 해지할 수 있습니다.

제4조 (약관 외 준칙)
본 약관에 규정되지 않은 사항에 대해서는 전기통신 기본법, 전기통신사업법, 정보통신망 이용 촉진 및 정보보호 등에 관한 법률 및 기타 관련 법령의 규정에 따릅니다.

제2장 서비스 이용 계약

제5조 (이용 계약의 성립)
이용계약은 회원이 되고자 하는 자 (이하 가입 신청자) 가 본 약관 및 개인정보 처리 방침에 동의한 후 회원 가입신청을 하면 회사가 입력된 일정 정보를 인증한 후 가입을 승낙함으로써 체결됩니다.

제6조 (이용 신청의 승낙 • 유보)
①가입신청자는 회사가 정한 소정의 양식에 필요한 정보를 입력하고 이용을 신청합니다.
②회사는 다음 각 호의 어느 하나에 해당하는 경우 그 사유가 해소될 때까지 승낙을 유보할 수 있습니다.
1. 서비스 관련 설비에 여유가 없는 경우
2. 기술상 지장이 있는 경우
3. 기타 위 각호에 준하는 사유가 존재하는 경우
③회사는 다음 각호의 어느 하나에 해당하는 경우 이용 신청에 대한 승낙을 거부할 수 있으며, 승낙 이후 그 사유가 발견된 경우에는 이용 제한 조치를 취하거나 계약을 해지할 수 있습니다.
1. 타인의 명의를 사용하여 이용을 신청한 경우
2. 필요한 정보를 허위로 기재하여 이용을 신청한 경우
3. 만 14세 미만의 아동이 부모 등 법정 대리인의 동의를 얻지 않고 이용을 신청한 경우
4. 기타 관련 법령을 위반하거나 회사가 정한 요건에 맞지 않게 이용을 신청한 경우
④스스로 서비스 이용 계약을 해지한 종전 회원이 해지일로부터 60일이 지나지 않은 상태에서 이용을 신청하는 경우 회사는 이를 승낙하지 않을 수 있습니다.
⑤약관 위반 등을 이유로 회사에 의해 이용계약이 해지된 종전 회원이 계약 해지일로부터 1년 이내에 다시 이용을 신청하는 경우 회사는 이를 승낙하지 않을 수 있습니다.

제7조 (회원 정보의 변경)
①회원은 개인정보관리 화면을 통해 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다.
②회원은 이용 신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정하거나 전자우편 기타 방법으로 회사에 변경 사항을 알려야 합니다. 회사는 회원이 변경 사항을 알리지 않아 발생한 불이익에 대하여 책임을 지지 않습니다.
③회사는 1년 이상 로그인하지 않은 회원을 휴면 회원으로 분류할 수 있습니다. 

제8조 (개인정보의 보호 및 보관 기간)
①회사는 “정보통신망 이용 촉진 및 정보보호 등에 관한 법률”, “개인정보 보호법” 등 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다.
②개인정보 처리 방침의 범위 내에서 회사는 업무와 관련하여 회원 전체 또는 일부의 개인정보에 관한 집합적인 통계 자료를 작성하여 이를 사용할 수 있고 서비스를 통하여 회원의 컴퓨터에 쿠키를 전송할 수 있습니다. 이 경우 회원은 쿠키의 수신을 거부하거나 쿠키의 수신에 대하여 경고하도록 사용하는 컴퓨터의 브라우저 설정을 변경할 수 있습니다.
③회사는 개명 등 회원이 직접 수정할 수 없는 개인정보의 변경이 발생한 경우에는 회원의 요청에 따라 회원의 개인정보를 수정할 수 있습니다.
④회원이 휴면 회원으로 분류될 경우, 휴면 회원의 개인정보는 분리하여 보관합니다. 회사는 회원이 서비스를 재개하거나 법령에 특별한 규정이 있는 경우를 제외하고는 분리된 개인정보를 이용하거나 제공하지 않습니다.
⑤회원이 이용계약을 해지한 경우 회사는 권리남용을 방지하고 권리침해와 관련한 분쟁에 대비하기 위하여 해지일로부터 60일 동안 회원의 개인정보를 보유할 수 있습니다. 다만, 제6조 제5항에 따라 회사가 계약을 해지한 경우에는 1년 동안 회원의 중복가입 확인 정보(DI)를 보관할 수 있습니다.

제3장 계약 당사자의 의무

제9조 (회사의 의무)

①회사는 계속적이고 안정적인 서비스의 제공을 위하여 지속적으로 노력하며, 설비에 장애가 생기거나 멸실된 때에는 지체 없이 이를 수리, 복구하여야 합니다. 다만, 천재지변, 비상사태 또는 그 밖에 부득이한 경우에는 그 서비스를 일시 중단하거나 정지할 수 있습니다.
②회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보 보호를 위한 보안시스템을 갖추어야 하며, 유지, 점검 및 복구 등의 조치를 성실히 이행합니다.
③제3자가 회사와 계약을 체결하고, 이에 근거하여 회사의 회원들에게 서비스를 제공하고자 하는 경우, 회사는 회원에게 개별적 동의를 받은 뒤, 동의의 범위 내에서 제3자에게 회원의 개인정보를 제공할 수 있고, 이 경우 회사는 회원의 개인정보를 보호하기 위한 관련 법령의 의무를 준수합니다.
④회사는 소정의 절차에 의해 제기되는 회원의 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다. 즉시 처리가 불가능한 경우에는 회원에게 그 사유와 처리 일정을 통지해야 합니다. 다만, 사실관계의 확인이 필요한 경우 등 처리에 소요되는 시간을 정확히 예측하기 어려운 경우에는 회원에게 그 사유를 통보하고 상당한 기간 내에 이를 처리할 수 있습니다.

제10조 (회원의 의무)
①회원은 관계 법령, 본 약관의 규정, 이용수칙 등 회사가 공지 또는 통지하는 사항을 준수하여야 하며, 회사의 업무를 방해하는 행위를 할 수 없습니다.
②회원은 회사의 사전 승낙 없이 회사가 저작권을 보유한 게시물을 복제, 전송, 수정, 번역, 출판, 배포, 방송하거나 기타 방법으로 사용하거나 제3자에게 제공하거나, 영리를 목적으로 이용할 수 없습니다.
③회원은 회사의 사전 승낙 없이 서비스를 이용하여 광고 등 영리 행위를 할 수 없습니다. 회사는 사전 승낙을 받지 않은 회원의 영리 행위로 인해 발생한 결과에 대하여 책임을 부담하지 않습니다. 회원은 사전승낙을 받지 않은 영리 행위로 인해 회사에 손해가 발생한 경우 회사에 대하여 손해배상 책임을 부담합니다.
④ID와 비밀번호에 관한 관리 책임은 회원에게 있으며, 관리 소홀, 부정 사용 등에 의하여 발생하는 모든 결과에 대한 책임은 회원이 부담합니다.
⑤회원이 게시물 작성 등 서비스 이용과 관련하여 제3자의 초상권, 상표권, 저작권 및 기타 권리를 사용하고자 하는 경우에는 사전에 정당한 권리자로부터 필요한 권리를 확보하여야 하며, 권한 없는 사용으로 권리자와 분쟁이 발생한 경우에는 회원이 모든 책임을 부담합니다.
⑥회원은 회사의 서비스 안정성에 영향을 미칠 수 있거나 회사가 용인하지 않은 방법으로 서비스를 이용하거나 포인트를 취득해서는 안 되며 이러한 방법을 유포해서는 안 됩니다.
⑦회원은 서비스 이용과 관련하여 다음 각호에 해당하는 행위를 하여서는 안 됩니다.
1. 타인의 ID를 이용하여 부당하게 서비스를 이용하는 행위
2. 회사 또는 제3자의 저작권, 초상권 및 기타 권리를 침해하는 행위
3. 공공질서 및 미풍양속에 위반되는 내용을 유포하는 행위
4. 선정적이거나 사회적 물의를 일으키는 내용을 유포하는 행위
5. 범죄와 결부된다고 객관적으로 판단되는 행위
6. 상습적으로 회원 간 분쟁을 유도하는 등 커뮤니티의 발전을 저해하는 행위
7. 바이러스, 악성코드 등을 유포하거나 해킹 등을 시도하는 행위
8. 다량의 정보를 전송하거나 광고성 정보를 전송하여 서비스의 안정적 운영을 방해하는 행위
9. 회사의 운영진, 관리자, 관계자를 사칭하는 행위
10. 위 각호의 내용이 포함되었다고 판단되는 닉네임을 사용하는 행위
11. 회사의 서비스를 방해하거나, 서비스에 고의로 손해를 끼치는 행위
12. 기타 관계 법령에 어긋나는 행위

제4장 서비스 이용

제11조 (서비스 이용 범위)
회사는 필요한 경우 회원의 연령, 본인 인증 여부 또는 부여한 등급에 따라 일부 서비스에 대한 접근을 제한할 수 있습니다.

제12조 (정보의 제공)
①회사는 서비스 이용 중 필요하다고 인정되는 다양한 정보를 공지사항이나 전자우편, SMS(MMS) 등의 방법으로 회원에게 제공할 수 있습니다.
②회사는 회원이 전항의 정보를 원치 않는다는 의사를 밝히는 경우 정보 제공 대상에서 해당 회원을 제외하여야 합니다. 다만, 회사는 이로 인해 발생한 불이익에 대하여 책임을 부담하지 않습니다.

제13조 (광고 게재 및 광고주와의 거래)
①회사가 제공하는 서비스에는 회사 이외의 광고주의 판촉활동을 위한 서비스가 포함되어 있으며, 서비스를 이용하는 자는 서비스 이용 시 노출되는 광고 게재에 대해 동의하는 것으로 간주됩니다.
②회사는 본 사이트에 게재된 광고주의 광고나 판촉활동의 진실성을 담보하지 않으며, 회원이 본 사이트에 게재되어 있거나 본 서비스를 통한 광고주의 판촉활동에 참여하여 거래한 결과로서 발생하는 손실과 손해에 대해서는 책임을 지지 않습니다.

제14조 (회원의 게시물)
①회사는 회원이 서비스를 통하여 등록한 게시물과 관련하여 어떠한 민형사상 책임도 부담하지 않으며, 회원이 등록한 게시물이나 다른 회원과 주고받은 쪽지가 다음 각 호 어느 하나에 해당하는 경우에는 사전통지 없이 이를 삭제할 수 있습니다.
1. 타인을 모욕하거나, 명예를 훼손하거나, 프라이버시를 침해하는 경우
2. 공공질서 및 미풍양속에 위반되는 내용인 경우
3. 범죄행위와 결부되었다고 인정되는 내용일 경우
4. 제3자의 저작권 및 기타 권리를 침해하는 경우
5. 회사에서 규정한 게시 목적이나 기간, 용량을 초과한 경우
6. 선정적인 음란물을 게재하거나 관련 정보가 포함된 경우
7. 반사회적이거나 사회적 물의를 일으키는 내용인 경우
8. 회사가 공지 또는 통지한 이용수칙을 위반한 경우
9. 본 약관 10조를 위반하는 게시물인 경우
10. 기타 관계법령에 위반된다고 판단되는 경우
②특정 회원이 등록한 게시물로 인해 사생활이 침해되거나 명예가 훼손되는 등 권리를 침해받은 자는 “정보통신망 이용 촉진 및 정보보호 등에 관한 법률"에 따라 침해 사실을 소명하여 해당 게시물의 삭제 요청을 할 수 있습니다. 이 경우 삭제 요청을 하는 자는 본인이 권리를 침해받은 당사자(혹은 대리인) 임을 증명할 수 있는 자료와 함께 해당 게시물의 위치 정보(URL)를 기재하여 요청하여야 합니다.
③회사는 위 2항에 따라 삭제를 요청받은 게시물이 사생활 침해 또는 명예훼손 등 권리를 침해한다고 인정하는 경우, 지체 없이 삭제 등의 조치를 취하여야 합니다. 다만, 회사가 해당 게시물 등의 권리침해 여부를 판단할 수 없거나 당사자 간의 다툼이 예상되는 경우 해당 게시물에 대해 10일간의 임시 조치를 진행합니다.

제15조 (게시물에 대한 권리 및 책임)
①회원이 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다. 단, 회사가 제공한 하이라이트 저장 기능을 사용하여 제작된 콘텐츠는 그 저작권이 회사로 귀속됩니다.
②회원은 회사 및 회사의 제휴사업자에게 해당 게시물을 일부 수정, 번역, 편집하여 국내외에서 사용할 수 있는 권리를 부여한 것으로 간주합니다. 이 경우, 회사는 저작권법을 준수하며 회원은 언제든지 고객센터 또는 서비스 내 관리 기능을 통해 해당 게시물의 사용 중단을 요청하거나 삭제할 수 있습니다.
③회사는 사전의 발간, 언어 연구, 언어 데이터베이스 구축 등을 위하여 회원의 게시물을 수집, 보존, 수정, 배포, 복제, 제공하는 등 자유롭게 사용할 수 있으며, 유튜브 등 제3자에게 동영상 콘텐츠를 게시하는 등의 해당 저작물을 이용할 수 있습니다.

제16조 (서비스 이용)
①회사는 업무상, 기술상 장애나 기타 특별한 사유가 없는 한 연중무휴로 1일 24시간 서비스를 제공합니다.
②전항에도 불구하고 회사는 일부 서비스에 대하여 이용 시간을 별도로 정할 수 있으며, 이 경우 그 이용 시간을 사전에 공지합니다.
③회사는 정전이나 정보통신 설비의 점검, 교체, 보수 등 상당한 이유가 있는 경우 서비스의 제공을 일시적으로 정지할 수 있습니다. 회사는 서비스 정지의 경우 사전에 공지하여야 하나 부득이한 사유가 있는 경우 사후에 공지할 수 있습니다.

제17조 (포인트, 서비스 요금 및 결제 등)
①회사는 회원의 활동 및 서비스 이용 정도에 따라 포인트를 지급하거나 차감할 수 있습니다.
②회사는 제18조 제2항에 따라 회원의 포인트를 차감할 수 있습니다. 차감된 포인트는 특별한 사유가 없는 이상 복구되지 않습니다.
③포인트 제도는 회사의 서비스 정책의 변동에 따라 변경될 수 있으며, 중대한 변경이 있을 경우에는 사전에 공지합니다.

제18조 (계약 해지 및 이용 제한)
①회원은 언제든지 온라인을 통해 이용 계약을 해지할 수 있습니다.
②회사는 회원이 제8조, 제19조, 제14조를 포함하여 본 약관 조항을 위반하거나, 회사의 정상적인 서비스 운영을 방해하는 경우 사전통지 없이 경고, 일부 서비스 이용 중지, 포인트 차감, 기간을 정한 서비스 이용 중지, 영구적인 서비스 이용 중지, 이용계약 해지 등의 조치를 취할 수 있습니다.
③회사는 본 약관 외에도 일부 서비스에 적용되는 이용 수칙을 수립하여 회원에게 공지할 수 있습니다. 회사는 회원들이 이용 수칙을 위반한 경우에도 제2항에 규정된 조치를 취할 수 있습니다.
④회사는 “정보통신망 이용 촉진 및 정보보호 등에 관한 법률”에 따라 회원이 작성한 게시물에 대하여 삭제 또는 임시 조치를 할 수 있으며, “게임산업 진흥에 관한 법률”, “청소년보호법” 등 관련 법령을 준 수하기 위하여 회원의 서비스 이용을 제한할 수 있습니다.

제5장 계약 해지 및 이용 제한

제19조 (광고 게재 및 광고주와의 거래)
①회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공 장애로 인한 관한 책임이 면제됩니다.
②회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
③회사는 회원이 서비스와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여 책임을 지지 않습니다.
④회사는 서비스를 매개로 한 회원 간 거래 또는 회원과 제3자 상호 간 거래에 대하여 책임을 지지 않습니다.
⑤회사는 서비스 이용과 관련하여 가입자에게 발생한 손해 가운데 회원의 고의, 과실에 의한 손해에 대하여 책임을 지지 않습니다.

제20조 (준거법 및 관할 법원)
회사와 회원 사이에 제기된 소송은 대한민국 법을 준거법으로 합니다.
회사와 회원 사이에 발생한 소송의 관할법원은 민사소송법에 따라 정합니다.
전항에도 불구하고 해외에 주소나 거소가 있는 회사와 회원 사이에 발생한 소송의 경우에는 대한민국 서울중앙지방법원을 관할법원으로 합니다.

<부칙> 본 약관은 2022년 12월 1일부터 적용됩니다.`;

export default function SignUp({ setToken }) {
  const toast = useCustomToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [checkmail, setCheckmail] = useState(false);
  const [passMail, setPassMail] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [phoneCode, setPhoneCode] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState();

  const [checkedItems, setCheckedItems] = useState([]);

  //회원가입 input 관리
  const onChangePassword = (e) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/;

    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false);
    else setPasswordError(true);

    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    if (password === e.target.value) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setConfirmPassword(e.target.value);
  };

  //이메일 onChange
  const onChangeEmail = (e) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!e.target.value || emailRegex.test(e.target.value)) {
      setEmailError(false);
      setCheckmail(true);
      setEmail(e.target.value);
    } else {
      setEmailError(true);
      setCheckmail(false);
      setPassMail(false);
      setEmail(e.target.value);
    }
  };

  //이름  onChange
  const onChangeUserName = (e) => {
    setUserNameError(false);
    setUserName(e.target.value);
  };

  //email 중복 검사
  const onCheckMail = async (e) => {
    e.preventDefault();
    if (!checkmail) {
      return;
    } else {
      const data = await checkSumEmail(email);
      if (data.data === true) {
        setCheckmail(true);
        setPassMail(true);
      } else {
        setCheckmail(false);
        setPassMail(false);
      }
    }
  };

  const onCheckPhone = async (e) => {
    e.preventDefault();
    if (!phone || !email) {
      alert("입력 사항을 모두 넣어주세요.");
      return null;
    }
    if (phoneError) {
      alert("형식에 맞지 않습니다.");
      return null;
    }
    const data = {
      type: "1",
      id: email,
      smsCountry: "+82",
      smsRecipient: phone,
    };
    const response = await smsSend(data);
    if (response.data.data.reason === "200") {
      // setPhoneError(false);
      setPhoneCode(true);
      alert("모바일 발송");
      Timer();
    } else if (response.data.data.reason === "205") {
      alert("이미 가입된 번호입니다.");
    }
  };

  const onChangePhone = (e) => {
    const regPhone = /^01([0|1|6|7|8|9|0])-?([0-9]{3,4})-?([0-9]{4})/;
    const number = e.target.value;

    // console.log("regPhone.test(number) :>> ", regPhone.test(number));

    if (!number || regPhone.test(number)) {
      setPhoneError(false);
      setPhoneError(false);
    } else {
      setPhoneError(true);
      setPhoneError(true);
    }

    setPhone(number);
    // if (number.indexOf("82") == 0) {
    //   return number.replace(/(^82)(2|\d{2})(\d+)?(\d{4})$/, "+$1-$2-$3-$4"); // +82
    // } else if (number.indexOf("1") == 0) {
    //   return number.replace(/(^1\d{3})(\d{4})$/, "$1-$2"); // 1588, 1566, 1677, ...
    // }
    // return number.replace(
    //   /(^02|^0504|^0505|^0\d{2})(\d+)?(\d{4})$/,
    //   "$1-$2-$3"
    // ); // 02/0504/0505/010/011/031
  };

  //약관동의
  const agreeHandler = (checked, value) => {
    if (checked) {
      setCheckedItems([...checkedItems, value]);
    } else if (!checked && checkedItems.includes(value)) {
      setCheckedItems(checkedItems.filter((el) => el !== value));
    }
  };

  const validation = () => {
    // if (!userId) setUserIdError(true);

    if (!password) setPasswordError(true);
    if (!confirmPassword) setConfirmPasswordError(true);
    if (!userName) setUserNameError(true);
    if (!email) setEmailError(true);

    if (password && confirmPassword && userName && email && !phoneAuth)
      return true;
    else return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validation()) return;
    if (!validation()) {
      toast({ title: "회원가입 실패", status: "error" });
      return;
    }
    //api call
    // const token = await signUpUser({ userInfo });
    const response = await signUpUser({
      id: email,
      pw: password,
      name: userName,
      mobile: phone,
      mobileAuth: "2",
    });
    if (response.data.result === "200") {
      toast({ title: "로그인 완료", status: "info" });
      navigator("/signup");
    } else {
      toast({ title: "Network Error", status: "warning" });
    }
  };

  const [phoneAuth, setResult] = useState(false);
  const handleOnChange = (res) => {
    setResult(res);
  };

  const onClickAuthcode = async (e) => {
    e.preventDefault();
    const inputData = { type: "1", smsRecipient: phone, smsAuth: phoneAuth };
    const { data } = await smsCheck(inputData);
    if (data.statusCode === 200) {
      setPhoneCheck(true);
    } else {
      setPhoneCheck(false);
    }
  };
  const onFinish = () => {
    setPhoneCode(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[50rem] pt-32 ">
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center py-5">
            <p className="text-3xl">회원가입</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="justify-start ">
              <div className="flex justify-between bg-[#569fbe] rounded-[15px]">
                <input
                  className=" h-14 ml-5 w-full bg-[#569fbe] rounded-lg text-white font-bold placeholder:text-white/80 placeholder:font-normal"
                  type="text"
                  placeholder="example@gmail.com"
                  name="email"
                  onChange={onChangeEmail}
                  required
                />
                <button
                  className="min-w-[60px] text-white"
                  value={email}
                  onClick={onCheckMail}
                >
                  확인
                </button>
              </div>
              <div className="text-right text-sm">
                {emailError === true ? (
                  <div className="invalid-input pr-2">
                    이메일 형식에 맞춰주세요.
                  </div>
                ) : passMail === true ? (
                  <div className="invalid-input pr-2">승인</div>
                ) : passMail === false && emailError === false ? (
                  <div className="invalid-input pr-2">중복</div>
                ) : (
                  <p className="mt-6"></p>
                )}
                {/* {!emailError && <br />} */}
              </div>
              <div className="flex h-14 justify-start items-center bg-[#569fbe] rounded-[15px]">
                <input
                  className="h-12 w-full mx-5 bg-[#569fbe] rounded-lg text-white font-bold placeholder:text-white/80 placeholder:font-normal"
                  type="name"
                  placeholder="이름"
                  name="name"
                  onChange={onChangeUserName}
                  required
                />
              </div>
              <br />
              <div className="flex h-14 justify-start items-center bg-[#569fbe] rounded-[15px]">
                <input
                  className="h-12 w-full mx-5 bg-[#569fbe] rounded-lg text-white font-bold placeholder:text-white/80 placeholder:font-normal"
                  type="password"
                  placeholder="비밀번호"
                  name="pw"
                  onChange={onChangePassword}
                />
              </div>
              <div className="text-right text-sm">
                {passwordError && (
                  <div className="invalid-input">
                    <>
                      <div>비밀번호는 영문 대소문자 !,@,#,$</div> 숫자를
                      혼합하여 8~20자로 입력해주세요
                    </>
                  </div>
                )}
                {!passwordError && <br />}
              </div>
              {/* <div className="text-right text-sm">
                
              </div> */}
              <div className="flex h-14 justify-start items-center bg-[#569fbe] rounded-[15px]">
                <input
                  className="h-12 w-full mx-5 bg-[#569fbe] rounded-lg text-white font-bold placeholder:text-white/80 placeholder:font-normal"
                  type="password"
                  placeholder="비밀번호 확인"
                  name="pwCheck"
                  valus={confirmPassword}
                  onChange={onChangeConfirmPassword}
                />
              </div>
              <div className="text-right text-sm">
                {confirmPasswordError && <>비밀번호가 다릅니다.</>}
                {!confirmPasswordError && <br />}
              </div>
            </div>
            <div className="flex justify-between bg-[#569fbe] rounded-[15px]">
              <input
                className="h-14 w-full ml-5 bg-[#569fbe] rounded-lg text-white font-bold placeholder:text-white/80 placeholder:font-normal"
                type="number"
                placeholder="'-'를 제외한 번호입력"
                name="phone"
                onChange={onChangePhone}
                // onInput={(e) => {
                //   if (e.target.value.length > e.target.maxLength)
                //     e.target.value = e.target.value.slice(
                //       0,
                //       e.target.maxLength
                //     );
                // }}

                required
                maxLength={11}
              />
              <button
                className="min-w-[60px] text-white"
                value={phone}
                onClick={onCheckPhone}
              >
                전송
              </button>
            </div>
            <div className="text-right text-sm">
              {phoneError && (
                <div className="invalid-input">숫자만 입력 가능합니다.</div>
              )}
              {!phoneError && <br />}
            </div>
            {phoneCode ? (
              <>
                <div className="text-right text-sm h-0">
                  {phoneCheck ? (
                    <>
                      <div className="text-right text-sm h-0">
                        {phoneCheck === 1 ? (
                          <div className="invalid-input pr-2">확인</div>
                        ) : (
                          <>
                            <div className="invalid-input pr-2"></div>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-row justify-center items-center">
                  <div>
                    <AuthCode
                      allowedCharacters="numeric"
                      onChange={handleOnChange}
                      containerClassName="container"
                      inputClassName="input"
                      length={"5"}
                    />
                  </div>
                  <button
                    className="bg-[#569fbe] rounded-lg text-white font-bold w-10 h-10 text-center"
                    onClick={onClickAuthcode}
                  >
                    확인
                  </button>
                </div>
                <Timer onFinish={onFinish} />
              </>
            ) : (
              <div className="flex justify-between bg-[#569fbe] rounded-[15px] mb-10"></div>
            )}
            <label>
              <input type="checkbox" />
              (필수) 이용 약관에 동의합니다.
            </label>
            <textarea
              className="w-full resize-none overflow-y:hidden border-2 h-24"
              value={Terms}
            />
            <div className="py-5">
              <button
                className="w-full bg-[#0877a7] rounded-lg h-14 text-white font-bold"
                onClick={handleSubmit}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
