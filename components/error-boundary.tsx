"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8 text-center">
            <p className="text-sm text-stone-500">
              Что-то пошло не так. Обновите страницу или позвоните нам напрямую.
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
