# Autofill NCCU Course Evaluation Survey(Tampermonkey Script)

自動填答 **國立政治大學NCCU** 的「教學意見調查」與「學生自評核心能力問卷」，支援中／英授課動態判斷。

---

## 功能特色

- **學習狀況**：缺課、預習、複習自動填(從未缺課、預習複習三小時)
- **教學成效共同題**：隨機選擇非常同意（50%）、同意(30%)、普通(20%) 
- **英文授課相關題目**：一律選第一個，曾修習英文授課課程數為4以上
- **關鍵能力題**：隨機選擇提升 80%~100%（50%）、60%~80%(30%)、40%~60%(20%) 
- **彈性授課題**：  **第一題須自填**，其餘自動選擇非常滿意＆無意見
- **核心能力自評**：將所有下拉題目一律設為最高分 5  

---

## 安裝方式

1. 在 Chrome / Firefox （Chromium目前不可用）安裝 [Tampermonkey](https://www.tampermonkey.net/)。  
2. 點擊 Tampermonkey 圖示 → **新增腳本** → 將*nccu-auto-fill.user.js*貼入並儲存

    **務必要把extension中的developer mode 開啟！！！**  

3. 前往 NCCU 問卷頁面，校務資訊系統 → 學生資訊系統 → 學術服務→ 本學期教學意見調查，點選課程問卷（會自動幫你填答），檢查後即可送出。


## 自訂與調整
- 隨機分布：可修改 `Math.random()` 加權邏輯，或統一改成指定分數。

- 欄位對應：若後端欄位名稱有變動，可到 Tampermonkey 編輯器中更新 `clickQ("Sxx", "y")`。

- 延遲時間：若網頁載入較慢，可將 `setTimeout(..., 300)` 中的延遲毫秒數調大。

## 注意事項
- ***僅供校內快速填答測試與示範，請務必遵守校方問卷填答規範。***

- 若問卷結構大幅調整，需同步更新此腳本。

## 授權
本專案採 MIT License 開放使用、修改與再發佈。
詳細內容請見 ./LICENSE。