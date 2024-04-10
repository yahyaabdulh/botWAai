const { proto, getContentType } = require("@whiskeysockets/baileys");
const axios = require("axios");
const util = require("util");
const chalk = require("chalk");
const widthCmdOn = false;

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://you.com/api/streamingSearch",
  params: {
    chatId: "d424f9ee-7195-46c0-b7b8-f2157b961feb",
    conversationTurnId: "f4f15998-ad30-4e3d-8cfe-c37aa0058fd9",
    count: "10",
    domain: "youchat",
    q: "buatkan saya docker file untuk menginstall phantomjs di alpine dan node js",
    mkt: "en-ID",
    page: "1",
    pastChatLength: "5",
    queryTraceId: "4436902b-3073-460b-8d2b-b70f203d8b34",
    responseFilter: "WebPages,TimeZone,Computation,RelatedSearches",
    safeSearch: "Moderate",
    selectedChatMode: "default",
    traceId:
      "4436902b-3073-460b-8d2b-b70f203d8b34|f4f15998-ad30-4e3d-8cfe-c37aa0058fd9|2024-04-09T19:29:27.870Z",
    use_personalization_extraction: "true",
  },
  headers: {
    accept: "text/event-stream",
    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    cookie:
      "uuid_guest=f6942d22-faa3-47dc-95d0-1f3ca3f361a5; uuid_guest_backup=f6942d22-faa3-47dc-95d0-1f3ca3f361a5; safesearch_guest=Moderate; _cfuvid=nVaMzjL0iP4n8kv.WEtVq3N_GZOShEVi1szMbxULz2w-1712689059734-0.0.1.1-604800000; ai_model=gpt_4; youchat_personalization=true; youchat_smart_learn=true; daily_query_date=Wed%20Apr%2010%202024; youpro_subscription=false; _clck=1exiyek%7C2%7Cfks%7C0%7C1560; AF_DEFAULT_MEASUREMENT_STATUS=true; afUserId=b29dd888-0721-4193-9679-97c3dda898d0-p; AF_SYNC=1712689061650; _ga=GA1.1.883785461.1712689066; FPID=FPID2.2.Q%2F2RF8E67FmXEGAPTFT75irqEL2VxrCf%2Ba0dkvAtAR8%3D.1712689066; FPLC=AavvOojC2RCsCdwyT08uSiRuOEd%2BN3FeuID4U4yyQfRMB8alJmprqxf8beQGN18eKxAcQF9x6Pe%2FlGJIuEV6MAnthHMa7WWgA%2FAqUi%2BSWdCcPVmvKTJIruIi%2BVXidg%3D%3D; FPAU=1.2.620203050.1712689069; _gtmeec=eyJjdCI6ImEzNjYwMzA2ZTk0MmRmZDg4ODM5OWMwZDZiNGI4ZTgxYmNkZDZkZmIyNWNiYjE3ODY3NTA0MzkxOTQ1MWZhMTYiLCJzdCI6ImJkZGYyZDI1MjhjN2JiZjUwOTQwM2E2NmY3ZjkwMjIyOTA0YzZkYWNkZDcxOTEwODllMGU0YWQ5ZmYyZjA1ZjciLCJjb3VudHJ5IjoiYTU2MTQ1MjcwY2U2YjNiZWJkMWRkMDEyYjczOTQ4Njc3ZGQ2MThkNDk2NDg4YmM2MDhhM2NiNDNjZTM1NDdkZCJ9; stytch_session=nZ0xIqgl5IUT-pNr8aK0x860YZzRN9g5Qla13kUC5yYl; ydc_stytch_session=nZ0xIqgl5IUT-pNr8aK0x860YZzRN9g5Qla13kUC5yYl; safesearch_deb40148f14a9344a2c9b4f13c451e89dfd94d05b1c62f5428ac13d207dee0b5=Moderate; ab.storage.deviceId.dcee0642-d796-4a7b-9e56-a0108e133b07=g%3A35b4aee6-a150-92d8-8d43-3433a11fcb1a%7Ce%3Aundefined%7Cc%3A1712689059478%7Cl%3A1712689174742; ab.storage.userId.dcee0642-d796-4a7b-9e56-a0108e133b07=g%3Auser-live-a3ca08ba-9a7d-4019-8845-680c837a1fc5%7Ce%3Aundefined%7Cc%3A1712689174741%7Cl%3A1712689174743; you_subscription=freemium; ab.storage.sessionId.dcee0642-d796-4a7b-9e56-a0108e133b07=g%3A70644ce7-e892-68b1-b2ec-cc5480030db4%7Ce%3A1712692555723%7Cc%3A1712689174742%7Cl%3A1712690755723; _clsk=1gsgryl%7C1712690761241%7C13%7C0%7Cl.clarity.ms%2Fcollect; stytch_session_jwt=eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3ay1saXZlLTAyY2RhYzg0LTFiYjktNDIzOC1iYTczLTAyYzY5MjUxNGUwMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicHJvamVjdC1saXZlLTlkZWE3ZGI1LTJlMTUtNGE3ZC1iYjFmLTJjYjg0ODBlYTliMCJdLCJhdXRoMF9pZCI6bnVsbCwiZXhwIjoxNzEyNjkxMjM4LCJodHRwczovL3N0eXRjaC5jb20vc2Vzc2lvbiI6eyJpZCI6InNlc3Npb24tbGl2ZS0zMmYwYmI3MC1iNTA5LTQ1ODUtOWI4Ni1jOTE1YWFjODRlOTMiLCJzdGFydGVkX2F0IjoiMjAyNC0wNC0wOVQxODo1OTozNFoiLCJsYXN0X2FjY2Vzc2VkX2F0IjoiMjAyNC0wNC0wOVQxOToyODo1OFoiLCJleHBpcmVzX2F0IjoiMjAyNC0wNy0wOFQxOToyNTo1NloiLCJhdHRyaWJ1dGVzIjp7InVzZXJfYWdlbnQiOiIiLCJpcF9hZGRyZXNzIjoiIn0sImF1dGhlbnRpY2F0aW9uX2ZhY3RvcnMiOlt7InR5cGUiOiJvYXV0aCIsImRlbGl2ZXJ5X21ldGhvZCI6Im9hdXRoX2dvb2dsZSIsImxhc3RfYXV0aGVudGljYXRlZF9hdCI6IjIwMjQtMDQtMDlUMTg6NTk6MzRaIiwiZ29vZ2xlX29hdXRoX2ZhY3RvciI6eyJpZCI6Im9hdXRoLXVzZXItbGl2ZS03ODkxNTk1YS00YjdhLTRkNmYtYTkyNS1mZTFhNzFjZDBhYmYiLCJwcm92aWRlcl9zdWJqZWN0IjoiMTE3NTExNDk5NzIwNTY3MzM1NTY0In19XX0sImlhdCI6MTcxMjY5MDkzOCwiaXNzIjoic3R5dGNoLmNvbS9wcm9qZWN0LWxpdmUtOWRlYTdkYjUtMmUxNS00YTdkLWJiMWYtMmNiODQ4MGVhOWIwIiwibmJmIjoxNzEyNjkwOTM4LCJzdWIiOiJ1c2VyLWxpdmUtYTNjYTA4YmEtOWE3ZC00MDE5LTg4NDUtNjgwYzgzN2ExZmM1IiwidXNlciI6eyJlbWFpbCI6InlhaHlhYWJkdWxoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmYW1pbHlfbmFtZSI6ImFiZHVsaCIsImdpdmVuX25hbWUiOiJ5YWh5YSIsIm5hbWUiOiJ5YWh5YWFiZHVsaEBnbWFpbC5jb20iLCJuaWNrbmFtZSI6InlhaHlhYWJkdWxoIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lZaTZ3aERNaldWYTdfMk5kRGVNU0lScWNhaU83TGRyUXpjdzl6cm1kZnRxWWJBd0U9czk2LWMiLCJzdHl0Y2hfdXNlcl9pZCI6InVzZXItbGl2ZS1hM2NhMDhiYS05YTdkLTQwMTktODg0NS02ODBjODM3YTFmYzUiLCJzdWIiOiJ1c2VyLWxpdmUtYTNjYTA4YmEtOWE3ZC00MDE5LTg4NDUtNjgwYzgzN2ExZmM1In19.KVPxvUm3Zvrfy1HKVo9_p0ipWyU8uX8gQCAgP5hxsw1iffGe0In8PHbBIhhiTGQepheR5YGGnH-6azJe8eTVo6MZ_6ade0kTJeEkPefFsd658kUk4RQJH_lEt3hy2yaO7GZ99zObzTeL2WSY1Ao-IIpuEQXXGxyhFUl5YMttd0Hehl9A46zhQ23Avgoq5dQnEggjjTpZ7aOU7aHvP_M6s51-9kWNwF6VOeqDKhO0Ip2S9x40hDc865bYnAH-UpHn6uIHMrwm93Fpw9hGMx9BAZ_hIX8_Le79ZDFjQ4HlMWTTGC1oEAcEk6-h0QyMFtAHDERech_sNiX-cgMP0ZjQ8Q; _ga_2N7ZM9C56V=GS1.1.1712689066.1.1.1712690941.0.0.1131997852; ydc_stytch_session_jwt=eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3ay1saXZlLTAyY2RhYzg0LTFiYjktNDIzOC1iYTczLTAyYzY5MjUxNGUwMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicHJvamVjdC1saXZlLTlkZWE3ZGI1LTJlMTUtNGE3ZC1iYjFmLTJjYjg0ODBlYTliMCJdLCJhdXRoMF9pZCI6bnVsbCwiZXhwIjoxNzEyNjkxMjM4LCJodHRwczovL3N0eXRjaC5jb20vc2Vzc2lvbiI6eyJpZCI6InNlc3Npb24tbGl2ZS0zMmYwYmI3MC1iNTA5LTQ1ODUtOWI4Ni1jOTE1YWFjODRlOTMiLCJzdGFydGVkX2F0IjoiMjAyNC0wNC0wOVQxODo1OTozNFoiLCJsYXN0X2FjY2Vzc2VkX2F0IjoiMjAyNC0wNC0wOVQxOToyODo1OFoiLCJleHBpcmVzX2F0IjoiMjAyNC0wNy0wOFQxOToyNTo1NloiLCJhdHRyaWJ1dGVzIjp7InVzZXJfYWdlbnQiOiIiLCJpcF9hZGRyZXNzIjoiIn0sImF1dGhlbnRpY2F0aW9uX2ZhY3RvcnMiOlt7InR5cGUiOiJvYXV0aCIsImRlbGl2ZXJ5X21ldGhvZCI6Im9hdXRoX2dvb2dsZSIsImxhc3RfYXV0aGVudGljYXRlZF9hdCI6IjIwMjQtMDQtMDlUMTg6NTk6MzRaIiwiZ29vZ2xlX29hdXRoX2ZhY3RvciI6eyJpZCI6Im9hdXRoLXVzZXItbGl2ZS03ODkxNTk1YS00YjdhLTRkNmYtYTkyNS1mZTFhNzFjZDBhYmYiLCJwcm92aWRlcl9zdWJqZWN0IjoiMTE3NTExNDk5NzIwNTY3MzM1NTY0In19XX0sImlhdCI6MTcxMjY5MDkzOCwiaXNzIjoic3R5dGNoLmNvbS9wcm9qZWN0LWxpdmUtOWRlYTdkYjUtMmUxNS00YTdkLWJiMWYtMmNiODQ4MGVhOWIwIiwibmJmIjoxNzEyNjkwOTM4LCJzdWIiOiJ1c2VyLWxpdmUtYTNjYTA4YmEtOWE3ZC00MDE5LTg4NDUtNjgwYzgzN2ExZmM1IiwidXNlciI6eyJlbWFpbCI6InlhaHlhYWJkdWxoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmYW1pbHlfbmFtZSI6ImFiZHVsaCIsImdpdmVuX25hbWUiOiJ5YWh5YSIsIm5hbWUiOiJ5YWh5YWFiZHVsaEBnbWFpbC5jb20iLCJuaWNrbmFtZSI6InlhaHlhYWJkdWxoIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lZaTZ3aERNaldWYTdfMk5kRGVNU0lScWNhaU83TGRyUXpjdzl6cm1kZnRxWWJBd0U9czk2LWMiLCJzdHl0Y2hfdXNlcl9pZCI6InVzZXItbGl2ZS1hM2NhMDhiYS05YTdkLTQwMTktODg0NS02ODBjODM3YTFmYzUiLCJzdWIiOiJ1c2VyLWxpdmUtYTNjYTA4YmEtOWE3ZC00MDE5LTg4NDUtNjgwYzgzN2ExZmM1In19.KVPxvUm3Zvrfy1HKVo9_p0ipWyU8uX8gQCAgP5hxsw1iffGe0In8PHbBIhhiTGQepheR5YGGnH-6azJe8eTVo6MZ_6ade0kTJeEkPefFsd658kUk4RQJH_lEt3hy2yaO7GZ99zObzTeL2WSY1Ao-IIpuEQXXGxyhFUl5YMttd0Hehl9A46zhQ23Avgoq5dQnEggjjTpZ7aOU7aHvP_M6s51-9kWNwF6VOeqDKhO0Ip2S9x40hDc865bYnAH-UpHn6uIHMrwm93Fpw9hGMx9BAZ_hIX8_Le79ZDFjQ4HlMWTTGC1oEAcEk6-h0QyMFtAHDERech_sNiX-cgMP0ZjQ8Q; __cf_bm=TTs5BJY6vUizkbRLhR4L79CaOYg9CA9fdHX2.yPfv2k-1712690943-1.0.1.1-8orIXEJxHc7DlgJQLi.CiodFxof1h45Il8.re5JrTw60_X_hBwPlrtvhnHgjsoGldrg.WZo9jTYDohbxZj_8VIe4J.OUNTl6GS8xW4HQKuk; daily_query_count=4; __cf_bm=ih_rYp6eUYhnWj9Kz1H81Dpast.flDoahHRak1l_1uA-1712710719-1.0.1.1-Rh3XuDO31net8zcG0hJ25y8iGOEun1rqErG7WtZ89UM5NHgOY91BP8paFp2tG9O6FppbOuay2FTUaEwk_cYuPYTQnMPeUxoFEaEFSM3qV28; uuid_guest=f6942d22-faa3-47dc-95d0-1f3ca3f361a5; uuid_guest_backup=f6942d22-faa3-47dc-95d0-1f3ca3f361a5; ydc_stytch_session=nZ0xIqgl5IUT-pNr8aK0x860YZzRN9g5Qla13kUC5yYl; ydc_stytch_session_jwt=eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3ay1saXZlLTAyY2RhYzg0LTFiYjktNDIzOC1iYTczLTAyYzY5MjUxNGUwMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicHJvamVjdC1saXZlLTlkZWE3ZGI1LTJlMTUtNGE3ZC1iYjFmLTJjYjg0ODBlYTliMCJdLCJhdXRoMF9pZCI6bnVsbCwiZXhwIjoxNzEyNjkxMjM4LCJodHRwczovL3N0eXRjaC5jb20vc2Vzc2lvbiI6eyJpZCI6InNlc3Npb24tbGl2ZS0zMmYwYmI3MC1iNTA5LTQ1ODUtOWI4Ni1jOTE1YWFjODRlOTMiLCJzdGFydGVkX2F0IjoiMjAyNC0wNC0wOVQxODo1OTozNFoiLCJsYXN0X2FjY2Vzc2VkX2F0IjoiMjAyNC0wNC0wOVQxOToyODo1OFoiLCJleHBpcmVzX2F0IjoiMjAyNC0wNy0wOFQxOToyNTo1NloiLCJhdHRyaWJ1dGVzIjp7InVzZXJfYWdlbnQiOiIiLCJpcF9hZGRyZXNzIjoiIn0sImF1dGhlbnRpY2F0aW9uX2ZhY3RvcnMiOlt7InR5cGUiOiJvYXV0aCIsImRlbGl2ZXJ5X21ldGhvZCI6Im9hdXRoX2dvb2dsZSIsImxhc3RfYXV0aGVudGljYXRlZF9hdCI6IjIwMjQtMDQtMDlUMTg6NTk6MzRaIiwiZ29vZ2xlX29hdXRoX2ZhY3RvciI6eyJpZCI6Im9hdXRoLXVzZXItbGl2ZS03ODkxNTk1YS00YjdhLTRkNmYtYTkyNS1mZTFhNzFjZDBhYmYiLCJwcm92aWRlcl9zdWJqZWN0IjoiMTE3NTExNDk5NzIwNTY3MzM1NTY0In19XX0sImlhdCI6MTcxMjY5MDkzOCwiaXNzIjoic3R5dGNoLmNvbS9wcm9qZWN0LWxpdmUtOWRlYTdkYjUtMmUxNS00YTdkLWJiMWYtMmNiODQ4MGVhOWIwIiwibmJmIjoxNzEyNjkwOTM4LCJzdWIiOiJ1c2VyLWxpdmUtYTNjYTA4YmEtOWE3ZC00MDE5LTg4NDUtNjgwYzgzN2ExZmM1IiwidXNlciI6eyJlbWFpbCI6InlhaHlhYWJkdWxoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmYW1pbHlfbmFtZSI6ImFiZHVsaCIsImdpdmVuX25hbWUiOiJ5YWh5YSIsIm5hbWUiOiJ5YWh5YWFiZHVsaEBnbWFpbC5jb20iLCJuaWNrbmFtZSI6InlhaHlhYWJkdWxoIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lZaTZ3aERNaldWYTdfMk5kRGVNU0lScWNhaU83TGRyUXpjdzl6cm1kZnRxWWJBd0U9czk2LWMiLCJzdHl0Y2hfdXNlcl9pZCI6InVzZXItbGl2ZS1hM2NhMDhiYS05YTdkLTQwMTktODg0NS02ODBjODM3YTFmYzUiLCJzdWIiOiJ1c2VyLWxpdmUtYTNjYTA4YmEtOWE3ZC00MDE5LTg4NDUtNjgwYzgzN2ExZmM1In19.KVPxvUm3Zvrfy1HKVo9_p0ipWyU8uX8gQCAgP5hxsw1iffGe0In8PHbBIhhiTGQepheR5YGGnH-6azJe8eTVo6MZ_6ade0kTJeEkPefFsd658kUk4RQJH_lEt3hy2yaO7GZ99zObzTeL2WSY1Ao-IIpuEQXXGxyhFUl5YMttd0Hehl9A46zhQ23Avgoq5dQnEggjjTpZ7aOU7aHvP_M6s51-9kWNwF6VOeqDKhO0Ip2S9x40hDc865bYnAH-UpHn6uIHMrwm93Fpw9hGMx9BAZ_hIX8_Le79ZDFjQ4HlMWTTGC1oEAcEk6-h0QyMFtAHDERech_sNiX-cgMP0ZjQ8Q",
  },
  responseType: "stream",
  timeout: 0,
};

const sendToAI = (promptText) => {
  console.time(color("REQUEST AI FINISH"));
  let txt = ``;
  return new Promise((resolve, reject) => {
    config.params.q = promptText;
    const request = axios.request(config);
    request
      .then((response) => {
        response.data.on("data", (chunk) => {
          const lines = chunk?.toString()?.split("\n");
          lines?.forEach((line) => {
            try {
              if (line?.includes("youChatToken")) {
                const message = line?.split("data: ")?.[1];
                if (message) {
                  const { youChatToken } = JSON.parse(message);
                  txt += youChatToken;
                }
              }
            } catch (error) {}
          });
        });
      })
      .catch((error) => {
        reject(error);
      });

    request.then((response) => {
      response.data.on("end", () => {
        resolve(txt);
        console.timeEnd(color("REQUEST AI FINISH"));
      });
    });
  });
};

const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

const getBuffer = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: "get",
      url,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1,
      },
      ...options,
      responseType: "arraybuffer",
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const startAI = async (client, m, chatUpdate) => {
  try {
    const body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";

    if (m.mtype === "viewOnceMessageV2") return;

    const budy = typeof m.text == "string" ? m.text : "";
    const prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    
    let isCmd2 = body.startsWith(prefix);
    if(!m?.isGroup) isCmd2 = body.startsWith(prefix) && widthCmdOn;

    const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";

    // flag itsMe

    const botNumber = await client.decodeJid(client.user.id);
    const sender = m.sender;
    const itsMe = sender == botNumber ? true : false;

    let text = (q = args.join(" "));

    // const from = m.chat;
    // const reply = m.reply;
    // const mek = chatUpdate.messages[0];

    // Group
    const groupMetadata = m.isGroup
      ? await client.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";

    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    if (!m.isGroup) {
      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`)
      );
    } else if (m.isGroup) {
      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
        chalk.blueBright("IN"),
        chalk.green(groupName)
      );
    }

    if(itsMe && !m.isGroup) return;
    
    if (!isCmd2) {
      const chatCompletion = await sendToAI(q);
      return m.reply(chatCompletion);
    }

    switch (command) {
      case "help":
      case "menu":
      case "start":
      case "info":
        m.reply(`*Whatsapp Bot OpenAI*
              
Cmd: ${prefix}ask 
Tanyakan apa saja kepada AI.`);
        break;
      case "ai":
      case "openai":
      case "chatgpt":
      case "ask":
        try {
          if (!text)
            return m.reply(
              `Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`
            );

          const chatCompletion = await sendToAI(q);
          await m.reply(chatCompletion);
        } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :" + error.message);
          }
        }
        break;
      default: {
        if (isCmd2 && budy.toLowerCase() != undefined) {
          if (m.chat.endsWith("broadcast")) return;
          if (m.isBaileys) return;
          if (!budy.toLowerCase()) return;
          if (argsLog || (isCmd2 && !m.isGroup)) {
            // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(
              chalk.black(chalk.bgRed("[ ERROR ]")),
              color("command", "turquoise"),
              color(`${prefix}${command}`, "turquoise"),
              color("tidak tersedia", "turquoise")
            );
          } else if (argsLog || (isCmd2 && m.isGroup)) {
            // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(
              chalk.black(chalk.bgRed("[ ERROR ]")),
              color("command", "turquoise"),
              color(`${prefix}${command}`, "turquoise"),
              color("tidak tersedia", "turquoise")
            );
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

function smsg(conn, m, store) {
  if (!m) return m;
  let M = proto.WebMessageInfo;
  if (m.key) {
    m.id = m.key.id;
    m.isBaileys = m.id.startsWith("BAE5") && m.id.length === 16;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat.endsWith("@g.us");
    m.sender = conn.decodeJid(
      (m.fromMe && conn.user.id) ||
        m.participant ||
        m.key.participant ||
        m.chat ||
        ""
    );
    if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || "";
  }
  if (m.message) {
    m.mtype = getContentType(m.message);
    m.msg =
      m.mtype == "viewOnceMessage"
        ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
        : m.message[m.mtype];
    m.body =
      m.message.conversation ||
      m.msg.caption ||
      m.msg.text ||
      (m.mtype == "viewOnceMessage" && m.msg.caption) ||
      m.text;
    let quoted = (m.quoted = m.msg.contextInfo
      ? m.msg.contextInfo.quotedMessage
      : null);
    m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
    if (m.quoted) {
      let type = getContentType(quoted);
      m.quoted = m.quoted[type];
      if (["productMessage"].includes(type)) {
        type = getContentType(m.quoted);
        m.quoted = m.quoted[type];
      }
      if (typeof m.quoted === "string")
        m.quoted = {
          text: m.quoted,
        };
      m.quoted.mtype = type;
      m.quoted.id = m.msg.contextInfo.stanzaId;
      m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
      m.quoted.isBaileys = m.quoted.id
        ? m.quoted.id.startsWith("BAE5") && m.quoted.id.length === 16
        : false;
      m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant);
      m.quoted.fromMe = m.quoted.sender === conn.decodeJid(conn.user.id);
      m.quoted.text =
        m.quoted.text ||
        m.quoted.caption ||
        m.quoted.conversation ||
        m.quoted.contentText ||
        m.quoted.selectedDisplayText ||
        m.quoted.title ||
        "";
      m.quoted.mentionedJid = m.msg.contextInfo
        ? m.msg.contextInfo.mentionedJid
        : [];
      m.getQuotedObj = m.getQuotedMessage = async () => {
        if (!m.quoted.id) return false;
        let q = await store.loadMessage(m.chat, m.quoted.id, conn);
        return exports.smsg(conn, q, store);
      };
      let vM = (m.quoted.fakeObj = M.fromObject({
        key: {
          remoteJid: m.quoted.chat,
          fromMe: m.quoted.fromMe,
          id: m.quoted.id,
        },
        message: quoted,
        ...(m.isGroup ? { participant: m.quoted.sender } : {}),
      }));

      /**
       *
       * @returns
       */
      m.quoted.delete = () =>
        conn.sendMessage(m.quoted.chat, { delete: vM.key });

      /**
       *
       * @param {*} jid
       * @param {*} forceForward
       * @param {*} options
       * @returns
       */
      m.quoted.copyNForward = (jid, forceForward = false, options = {}) =>
        conn.copyNForward(jid, vM, forceForward, options);

      /**
       *
       * @returns
       */
      m.quoted.download = () => conn.downloadMediaMessage(m.quoted);
    }
  }
  if (m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg);
  m.text =
    m.msg.text ||
    m.msg.caption ||
    m.message.conversation ||
    m.msg.contentText ||
    m.msg.selectedDisplayText ||
    m.msg.title ||
    "";
  /**
   * Reply to this message
   * @param {String|Object} text
   * @param {String|false} chatId
   * @param {Object} options
   */
  m.reply = (text, chatId = m.chat, options = {}) =>
    Buffer.isBuffer(text)
      ? conn.sendMedia(chatId, text, "file", "", m, { ...options })
      : conn.sendText(chatId, text, m, { ...options });
  /**
   * Copy this message
   */
  m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)));

  return m;
}

module.exports = {
  sendToAI,
  startAI,
  getBuffer,
  color,
  smsg,
};
