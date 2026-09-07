# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

- 서비스 이름: 링크나무
- 한 줄 설명: 내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 서비스 (Linktree 스타일)
- 타겟 사용자: SNS에 여러 링크를 공유하고 싶은 개인 창작자, 개발자, 프리랜서
- 출시 범위: 아래 핵심 기능을 갖춘 웹 서비스 (모바일 반응형)

## 기술 스택

- Next.js 16 (App Router), React 19
- Tailwind CSS v4
- MongoDB Atlas (클릭 수 저장)
- Vercel (배포)

## 핵심 기능

- 프로필: 이름, 한 줄 소개, 프로필 사진 표시
- 링크 카드: SNS · 블로그 링크를 카드 형태로 나열, 클릭 가능
- 다크모드: 밝은 화면 / 어두운 화면 전환
- 클릭 수 집계: 링크별 클릭 횟수 기록

## 코드 규칙

- TypeScript 사용
- 컴포넌트는 `src/components/` 아래에 작성
- 환경 변수는 `.env.local`에 저장 (절대 커밋하지 않음)
- 모바일 우선 반응형 디자인
