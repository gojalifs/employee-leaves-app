interface FlashMessage {
    message: string;
}

interface FlashPageProps extends PageProps {
    flash: FlashMessage;
}
