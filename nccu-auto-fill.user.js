// ==UserScript==
// @name         NCCU 教學 & 核心能力問卷自動填答
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  自動填答 NCCU 教學意見調查 & 學生自評核心能力問卷，中/英授課動態判斷 + 核心能力全勾 5 分
// @match        https://moltke.nccu.edu.tw/stucmt_SSO/app.jsp?*
// @match        https://*/cmmaptqstu/*Default.aspx?*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    // ───── 教學意見調查 ─────
    if (!window.__surveyDone && location.href.includes('stucmt_SSO/app.jsp')) {
        window.__surveyDone = true;
        setTimeout(() => {
            const clickQ = (q, v) => {
                const el = document.querySelector(`input[name='${q}'][value='${v}']`);
                if (el) el.click();
            };

            // 學習狀況
            clickQ("S08", "1");
            clickQ("S09", "4");
            clickQ("S10", "4");

            // 教學成效共同題
            const common = ["S13","S14","S15","S18","S19","S20","S21","S22","S24","S25","S26","S27","S28"];
            common.forEach(q => {
                const r = Math.random(), v = r<0.5?"1":r<0.8?"2":"3";
                clickQ(q, v);
            });

            clickQ("S23", "2");
            document.querySelector("input[name='agree']")?.click();

            const hasCustom = !!document.querySelector("input[name='S35']");
            // 關鍵能力題
            const keyQs = hasCustom
                ? ["S45","S46","S47","S48","S49","S50","S51"]
                : ["S37","S38","S39","S40","S41","S42","S43"];
            keyQs.forEach(q => {
                const r = Math.random(), v = r<0.5?"5":r<0.8?"4":"3";
                clickQ(q, v);
            });

            // 英語授課客製題
            if (hasCustom) {
                const cust = { S35:"1", S36:"1", S37:"1", S38:"1", S39:"1", S40:"1", S41:"5" };
                Object.entries(cust).forEach(([q,v])=> clickQ(q, v));
            }

            // 彈性授課題
            const flexFirst = hasCustom
                ? ["S55","S56","S57","S59"]
                : ["S47","S48","S49","S51"];
            flexFirst.forEach(q => clickQ(q, "1"));
            const flexNoOpinion = hasCustom
                ? ["S57","S59"]
                : ["S49","S51"];
            flexNoOpinion.forEach(q => clickQ(q, "4"));

            
        }, 300);
    }

    // ───── 學生自評核心能力問卷 ─────
    if (!window.__coreDone && document.querySelector("select[id$='ddlLevNum']")) {
        window.__coreDone = true;
        setTimeout(() => {
            // 將所有核心能力下拉選單設為 5
            document
                .querySelectorAll("select[id$='ddlLevNum']")
                .forEach(sel => { sel.value = "5"; sel.dispatchEvent(new Event('change')); });

            // 自動按下「完成送出」
            //const btn = document.querySelector("input[type='submit'][value='完成送出']");
            //if (btn) btn.click();

            
        }, 300);
    }
})();
