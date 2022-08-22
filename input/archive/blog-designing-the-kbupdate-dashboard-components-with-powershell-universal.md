Title: Designing the kbupdate Dashboard Components with PowerShell Universal
Type: blog
Published: 2022-08-27
Excerpt: Recently I was contacted by Chrissy LeMaire, PowerShell enthusiast, to assist with designing a PowerShell Universal theme for her project, kbupdate.
Tags:
- 2022
- powershell
- kbupdate
- project
- css
ImageListing: blog-kbupdate-powershell-universal.png
OgImage: blog-kbupdate-powershell-universal-og.png
TwitterImage: blog-kbupdate-powershell-universal-twitter.png
DestinationPath: blog/designing-the-kbupdate-dashboard-components-with-powershell-universal.html
---

Recently I was contacted by [Chrissy LeMaire](https://github.com/potatoqualitee), PowerShell enthusiast, to assist with designing a [PowerShell Universal](https://ironmansoftware.com/powershell-universal) theme for her project, [kbupdate](https://github.com/potatoqualitee/kbupdate).

I was sent a sample of "CSS" written in a PowerShell hashtable and was told that somehow this would magically be turned into the CSS that will control the look and feel of the website.

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/YVPwi7L2izTJS" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" title="GIF of Bubbles from Trailer Park Boys" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/life-germany-YVPwi7L2izTJS">via GIPHY</a></p>

Let's get a few things clear here, I know 0 PowerShell. So this concept was a bit odd to me at first, but also totally awesome. Even though I've never really worked with PowerShell, I decided to give the project a go. I'm always up for a good challenge and learning something new.

<p class="lead mb-0">The prerequisites:</p>
<ul class="list-unstyled mb-0">
    <li>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="prereqBeforeOne" disabled>
            <label class="form-check-label" for="prereqBeforeOne">Dark and a light mode</label>
        </div>
    </li>
    <li>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="prereqBeforeTwo" disabled>
            <label class="form-check-label" for="prereqBeforeTwo">Have a modern look and feel similar to GitHub</label>
        </div>
    </li>
    <li>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="prereqBeforeThree" disabled>
            <label class="form-check-label" for="prereqBeforeThree">Fun colors</label>
        </div>
    </li>
    <li>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="prereqBeforeFour" disabled>
            <label class="form-check-label" for="prereqBeforeFour">Easy-to-read text</label>
        </div>
    </li>
</ul>

<h2 class="mt-4">Diving In</h2>

The first thing I did was scavenged the PowerShell Universal docs for a few hours to try to wrap my brain around how Powershell Universal worked. Turns out it is built on top of the [Material UI](https://mui.com/) framework, specifically the [default theme](https://mui.com/material-ui/customization/default-theme/). So not only does PowerShell Universal convert PowerShell to CSS, but it also converts PowerShell into React components. How cool!

<h2 class="mt-4">Choosing a styling approach</h2>

In PowerShell Universal, there is the option to [add a traditional custom CSS file](https://docs.powershelluniversal.com/userinterfaces/dashboards/themes/cascading-style-sheets) in addition to the `theme.ps1` (the intimidating hashtable from earlier) file. Initially, I was excited about this, however, the more tested it out, it made more sense to embrace PowerShell and use the CSS file as little as possible. 

Why? Updating styles in the `theme.ps1` file tends to override rules more gracefully than a CSS file. Updating the `theme.ps1` file adds extra styles onto the initial rule supplied by Material UI instead of creating a new rule entirely. This removes the need for a bunch of unnecessary `!important` flags floating around, so for me, this was the obvious choice.

<h2 class="mt-4">Breaking down the theme.ps1 file</h2>

The `theme.ps1` file turned out to not be so scary after all. There are two different areas for adding specific styles for dark and light modes. These are then compiled into a `dark.css` and a `light.css` and applied whenever a user switches their theme mode.

For these examples, we'll target the top navigation bar with the class `.MuiAppBar-root`.

<div class="my-4">
    <ul class="nav nav-tabs" id="blogPSUTabOne" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="ps1-1-tab" data-bs-toggle="tab" data-bs-target="#ps1-1-tab-pane" type="button" role="tab" aria-controls="ps1-1-tab-pane" aria-selected="true">theme.ps1</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="css-1-tab" data-bs-toggle="tab" data-bs-target="#css-1-tab-pane" type="button" role="tab" aria-controls="css-1-tab-pane" aria-selected="false">Compiled CSS</button>
        </li>
    </ul>
    <div class="tab-content" id="blogPSUTabOne">
        <div class="tab-pane fade show active" id="ps1-1-tab-pane" role="tabpanel" aria-labelledby="ps1-1-tab" tabindex="0">
<pre><code class="language-powershell">
@{
    light = @{
        palette = @{
            mode = "light"
            background = @{
                default = "#f6f8fa"
            }
            primary = @{
                main = "#209fda"
            }
        }
        overrides = @{
            MuiAppBar = @{
                root = @{
                    backgroundColor = "#ffffff"
                    backgroundImage = "none"
                    borderBottom = "1px solid #dddfe1"
                }
            }
        }
    }
    dark = @{
        palette = @{
            mode = "dark"
            background = @{
                default = "#0d1117"
            }
            primary = @{
                main = "#209fda"
            }
        }
        overrides = @{
            MuiAppBar = @{
                root = @{
                    backgroundColor = "#161b22"
                    backgroundImage = "none"
                    borderBottom = "1px solid #30363d"
                }
            }
        }
    }
}
</code></pre>
        </div>
        <div class="tab-pane fade" id="css-1-tab-pane" role="tabpanel" aria-labelledby="css-1-tab" tabindex="0">
<pre><code class="language-css">
/* light.css */
&emsp;
.MuiAppBar-root {
    /* MUI styles */
    /* Custom styles below */
    background-color: #ffffff;
    background-image: none;
    border-bottom: 1px solid #dddfe1;
}
</code></pre>  
<pre><code class="language-css">
/* dark.css */
&emsp;
.MuiAppBar-root {
    /* MUI styles */
    /* Custom styles below */
    background-color: #161b22;
    background-image: none;
    border-bottom: 1px solid #30363d;
}
</code></pre> 
        </div>
    </div>
</div>

As you can see above, the conversion from PowerShell to CSS is quite simple. Just by looking at the two and comparing you can pretty much tell what is going on. The PowerShell Universal [docs](https://docs.powershelluniversal.com/userinterfaces/dashboards/themes) are also very good at explaining this and giving a few examples of what is possible.

Cool. So I modified a few things, and saw the changes, everything was looking good. Along with the main background colors, the alert component was the first thing I styled.

<div class="row my-4 text-center">
    <div class="col-sm-6 mb-4 mb-sm-0">
        <img class="border-opposite" src="/assets/images/blog/blog-kbupdate-alert-dark.png" alt="PowerShell Universal alert component in dark mode for the kbupdate theme">
    </div>
    <div class="col-sm-6">
        <img class="border-opposite" src="/assets/images/blog/blog-kbupdate-alert-light.png" alt="PowerShell Universal alert component in light mode for the kbupdate theme">
    </div>
</div>

One problem, my `theme.ps1` file was becoming a million miles long. I was duplicating a lot of the same code in both themes when I really only needed to change the value and not the rule itself. This was getting increasingly more annoying, so, I did a thing:

<div class="my-4">
    <ul class="nav nav-tabs" id="blogPSUTabTwo" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="ps1-2-tab" data-bs-toggle="tab" data-bs-target="#ps1-2-tab-pane" type="button" role="tab" aria-controls="ps1-2-tab-pane" aria-selected="true">theme.ps1</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="json-2-tab" data-bs-toggle="tab" data-bs-target="#json-2-tab-pane" type="button" role="tab" aria-controls="json-2-tab-pane" aria-selected="false">colors.json</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="function-2-tab" data-bs-toggle="tab" data-bs-target="#function-2-tab-pane" type="button" role="tab" aria-controls="function-2-tab-pane" aria-selected="false">functions.ps1</button>
        </li>
    </ul>
    <div class="tab-content" id="blogPSUTabTwo">
        <div class="tab-pane fade show active" id="ps1-2-tab-pane" role="tabpanel" aria-labelledby="ps1-2-tab" tabindex="0">
<pre><code class="language-powershell">
$colors = Get-Colors
$common = $colors | Where-Object Mode -eq common
$themes = $colors | Where-Object Enabled
$allThemes = @{}
&emsp;
ForEach ($theme in $themes) {
    $allThemes += @{
        $theme.Mode = @{
            palette = @{
                mode = $theme.Mode
                background = @{
                    default = $theme.Main
                }
                primary = @{
                    main = $common.Blue
                }
            }
            overrides = @{
                MuiAppBar = @{
                    root = @{
                        backgroundColor = $theme.MainSecondary
	                    backgroundImage = "none"
                        borderBottom = "1px solid " + $theme.MainGamma
                    }
                }
            }
        }
    }
}
</code></pre>
        </div>
        <div class="tab-pane fade" id="json-2-tab-pane" role="tabpanel" aria-labelledby="json-2-tab" tabindex="0">
<pre><code class="language-json">
[
    {
        "Mode": "common",
        "Enabled": false,
        "Blue": "#209fda"
    },
    {
        "Mode": "dark",
        "Enabled": true,
        "Main": "#0d1117",
        "MainSecondary": "#161b22",
        "MainGamma": "#30363d"
    },
    {
        "Mode": "light",
        "Enabled": true,
        "Main": "#f6f8fa",
        "MainSecondary": "#ffffff",
        "MainGamma": "#dddfe1"
    }
]
</code></pre>
        </div>
        <div class="tab-pane fade" id="function-2-tab-pane" role="tabpanel" aria-labelledby="function-2-tab" tabindex="0">
<pre><code class="language-powershell">
function Get-Colors {
    Get-Content -Path (Join-Path -Path $script:UDRoot -ChildPath colors.json) | ConvertFrom-Json
}
</code></pre>   
        </div>
    </div>
</div>

Boom!💥 Now, instead of repeating the same thing in multiple places, we define it once and loop through the `colors.json` file to pull the color values. This beautiful piece of PowerShell cuts down the `theme.ps1` file in half, plus all the colors are contained in one spot. You can also use the colors on components just by pulling them into the page file with the `Get-Colors` function.

<div class="my-4">
<pre><code class="language-powershell">
# dashboard.ps1
&emsp;
$colors = Get-Colors
$common = $colors | Where-Object Mode -eq common
&emsp;
New-UDCheckBox -Icon $Icon -CheckedIcon $CheckedIcon -Style @{
    color = $common.Blue
}
</code></pre>
</div>

## The Results

After a few weeks of hackery (this would have been faster, but kids), I came up with some pretty sweet concepts. I put together a sample dashboard to show off some of the components.

<div class="row mb-4 mt-4 text-center">
    <div class="col-sm-6 mb-4 mb-sm-0">
        <img class="border-opposite" src="/assets/images/blog/blog-kbupdate-dashboard-1-dark.png" alt="PowerShell Universal component samples in dark mode for the kbupdate theme">
    </div>
    <div class="col-sm-6">
        <img class="border-opposite" src="/assets/images/blog/blog-kbupdate-dashboard-1-light.png" alt="PowerShell Universal component samples in light mode for the kbupdate theme">
    </div>
</div>
<div class="ratio ratio-1792x978 overflow-hidden border-opposite">
    <video class="lazy" width="1792" height="978" autoplay muted loop playsinline>
        <source data-src='/assets/images/blog/kbupdate-dashboard-samples.mp4' type="video/mp4">
        kbupdate Dashboard Sample Components
    </video>
</div>
<div class="row mt-4 text-center">
    <div class="col-sm-6 mb-4 mb-sm-0">
        <img class="border-opposite" src="/assets/images/blog/blog-kbupdate-dashboard-2-dark.png" alt="PowerShell Universal component samples in dark mode for the kbupdate theme">
    </div>
    <div class="col-sm-6">
        <img class="border-opposite" src="/assets/images/blog/blog-kbupdate-dashboard-2-light.png" alt="PowerShell Universal component samples in light mode for the kbupdate theme">
    </div>
</div>

<h2 class="mt-4">Wait, hold up. Is that... dim mode?</h2>

Turns out, that since all the colors are contained in the JSON file, adding or updating a theme is a breeze. Just swap out a few colors and that's it! Pretty nifty, aye?

<p class="lead mb-0">Let's go back to the prerequisites:</p>
<ul class="list-unstyled mb-0">
    <li>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="prereqAfterOne" checked disabled>
            <label class="form-check-label" for="prereqAfterOne">Dark and a light mode <span class="confetti cursor-pointer link-underline link-underline-alpha" tabindex="0">+ BONUS DIM MODE</span></label>
        </div>
    </li>
    <li>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="prereqAfterTwo" checked disabled>
            <label class="form-check-label" for="prereqAfterTwo">Have a modern look and feel similar to GitHub</label>
        </div>
    </li>
    <li>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="prereqAfterThree" checked disabled>
            <label class="form-check-label" for="prereqAfterThree">Fun colors</label>
        </div>
    </li>
    <li>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="prereqAfterFour" checked disabled>
            <label class="form-check-label" for="prereqAfterFour">Easy-to-read text</label>
        </div>
    </li>
</ul>

<h2 class="mt-4">Final thoughts</h2>

Overall I had a great time working on this project and definitely learned more about PowerShell. It was a nice break away from my normal go-to technologies, and working with Chrissy has been fun!

<p class="lead mb-0">Things to note:</p>

1. You don't need to know PowerShell to write a theme for PowerShell Universal.
1. Even though PowerShell Universal converts PowerShell into React components, you do not need to know React either.
1. You also don't need to know much about the default Material UI theme, but reading their docs does help to create a basic understanding.
1. PowerShell Universal is actively maintained and adding new features and bug fixes on a regular cadence.

Will I do another project in PowerShell Universal? Perhaps. I'd like to try my hand at creating some [custom components](https://docs.powershelluniversal.com/userinterfaces/dashboards/components/building-custom-components) as well. I have ideas. 🤓⚗️🔬

<p class="mb-0">Have more questions or just want to chat? <a href="#connect">Connect with me below</a>, I love hearing and learning from other rad developers!</p>
