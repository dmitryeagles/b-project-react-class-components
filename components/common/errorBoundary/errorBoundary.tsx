import React, {ReactNode} from "react";
import ErrorFuse from "../errorFuse/errorFuse";

interface ErrorBoundaryProps {
    children: ReactNode | undefined;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
            error: null
        }
    }

    static getDerivedStateFromError(error: Error) {

        return {
            hasError: true,
            error
        };
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFuse errorText={this.state.error?.message}/>;
        }
        return this.props.children;
    }
}
