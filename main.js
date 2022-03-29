noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    document.getElementById("square_sides").innerHTML = "Width-Height of square is " + difference + "px";
    background('#00FFFF')
    fill('#03c03c');
    stroke('#03c03c');
    square(noseX, noseY, difference);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X = " + noseX + ", nose Y = " + noseY);
        leftWristY = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(rightWristX - leftWristX);
        console.log("Right wrist X = " + rightWristX + "left wrist X = " + leftWristX + "difference = " + difference);
    }
}