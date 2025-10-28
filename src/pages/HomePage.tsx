import { Title } from "@/components"

function HomePage() {
    return (
        <div className="mt-6">
            <Title>
                <span className="text-blue-400">WELCOME  </span>
            </Title>
            <Title>
                <span className="text-yellow-300">
                    Drag<span className="text-orange-500">o</span>n
                </span>
                <span className="text-red-600">BallZ</span>
            </Title>
        </div>
    )
}

export default HomePage