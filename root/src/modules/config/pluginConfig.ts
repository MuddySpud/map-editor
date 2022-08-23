import ConcealedDiscussionPlugin from "../components/plugins/discussion/concealed/ConcealedDiscussionPlugin";
import MarkdownDiscussionPlugin from "../components/plugins/discussion/markdown/MarkdownDiscussionPlugin";
import QuizDiscussionPlugin from "../components/plugins/discussion/quiz/QuizDiscussionPlugin";
import VideoDiscussionPlugin from "../components/plugins/discussion/video/VideoDiscussionPlugin";
import ImageOptionsPlugin from "../components/plugins/option/image/imageOptionsPlugin";
import ConcealedOptionsPlugin from "../components/plugins/option/concealed/ConcealedOptionsPlugin";
import TitleTextDiscussionPlugin from "../components/plugins/discussion/titleText/titleTextDiscussionPlugin";
import LinkDiscussionPlugin from "../components/plugins/discussion/link/LinkDiscussionPlugin";


const pluginConfig = {

    register: (): void => {

        window.TreeSolve.discussionPlugins.plugins.push(new MarkdownDiscussionPlugin());
        window.TreeSolve.discussionPlugins.plugins.push(new QuizDiscussionPlugin());
        window.TreeSolve.discussionPlugins.plugins.push(new VideoDiscussionPlugin());
        window.TreeSolve.discussionPlugins.plugins.push(new ConcealedDiscussionPlugin());
        window.TreeSolve.discussionPlugins.plugins.push(new TitleTextDiscussionPlugin());
        window.TreeSolve.discussionPlugins.plugins.push(new LinkDiscussionPlugin());

        window.TreeSolve.optionsPlugins.plugins.push(new ImageOptionsPlugin());
        window.TreeSolve.optionsPlugins.plugins.push(new ConcealedOptionsPlugin());
    }
};

export default pluginConfig;

